import json
import logging
import math
import re

from openai import AsyncOpenAI
from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

IELTS_PROMPT = """You are an expert IELTS examiner. Evaluate the following IELTS {task_type} essay.

IELTS Writing Prompt: {prompt}

Student's Essay:
\"\"\"
{essay}
\"\"\"

Provide your evaluation as a JSON object with exactly these fields:
{{
  "overall_band": <float 1.0-9.0 in 0.5 increments>,
  "task_achievement": <float 1.0-9.0>,
  "coherence_cohesion": <float 1.0-9.0>,
  "lexical_resource": <float 1.0-9.0>,
  "grammar_accuracy": <float 1.0-9.0>,
  "feedback_text": "<detailed paragraph explaining the overall quality and band score>",
  "suggestions": "<specific numbered suggestions for improvement, separated by newlines>",
  "strengths": "<what the student did well>"
}}

Band descriptors:
- 9: Expert — near flawless
- 8: Very good — rare inaccuracies
- 7: Good — handles complex language well
- 6: Competent — generally effective despite inaccuracies
- 5: Modest — partial command, frequent problems
- 4: Limited — basic competence, many errors

Be accurate. Do NOT default to 6.5. Assign the band that genuinely reflects the essay quality.
Return ONLY valid JSON, no markdown, no code fences.
"""

LINKING_WORDS = frozenset({
    # Addition
    "furthermore", "moreover", "additionally", "in addition", "also",
    "besides", "what is more", "not only", "as well as", "coupled with",
    # Contrast
    "however", "nevertheless", "nonetheless", "on the other hand",
    "on the contrary", "although", "despite", "in contrast", "yet",
    "while", "whereas", "even though", "in spite of", "conversely",
    "by contrast",
    # Cause / Effect
    "therefore", "consequently", "as a result", "thus", "hence",
    "because", "due to", "owing to", "since", "so that", "leads to",
    "resulting in",
    # Exemplification
    "for example", "for instance", "such as", "namely", "in particular",
    "to illustrate", "as an example", "to demonstrate",
    # Conclusion
    "in conclusion", "to conclude", "to summarize", "in summary",
    "overall", "in brief", "finally", "to sum up",
    # Emphasis
    "indeed", "certainly", "clearly", "undoubtedly", "in fact",
    "notably", "it is worth noting",
    # Sequence
    "firstly", "secondly", "thirdly", "first of all", "to begin with",
    "subsequently", "previously", "meanwhile", "in the first place",
})

ACADEMIC_VOCAB = frozenset({
    "analyze", "analyse", "assess", "contribute", "demonstrate",
    "emphasize", "emphasise", "facilitate", "highlight", "implement",
    "indicate", "justify", "maintain", "obtain", "perceive", "propose",
    "require", "significant", "ultimately", "beneficial", "fundamental",
    "perspective", "substantial", "predominantly", "inevitably",
    "consequently", "simultaneously", "comprehensive", "controversial",
    "sustainable", "infrastructure", "phenomenon", "paradigm",
    "alternative", "conventional", "particularly", "extensively",
    "increasingly", "dramatically", "profoundly", "arguably",
    "acknowledge", "advocate", "alleviate", "ameliorate", "anticipate",
    "augment", "circumvent", "collaborate", "comprehend", "contemplate",
    "contradict", "correlate", "deteriorate", "distinguish", "elaborate",
    "enhance", "exacerbate", "generate", "illuminate", "mitigate",
    "necessitate", "perpetuate", "prioritize", "reinforce", "scrutinize",
    "stimulate", "undermine", "validate", "accommodate", "detrimental",
    "indispensable", "proliferation", "unprecedented", "ubiquitous",
    "inherent", "subjective", "objective", "considerable", "numerous",
    "crucial", "essential", "effective", "efficient", "diverse",
    "apparent", "relative", "extensive",
})

COMPLEX_PATTERNS = (
    r'\bwhich\b', r'\bwho\b', r'\bwhom\b', r'\bwhose\b',
    r'\bthat\b', r'\bwhere\b', r'\bwhen\b',
    r'\balthough\b', r'\bbecause\b', r'\bsince\b',
    r'\bunless\b', r'\bwhereas\b', r'\bwhile\b',
    r'\bdespite\b', r'\bhaving\b',
    r'\bin order to\b', r'\bso as to\b',
    r'\beven if\b', r'\beven though\b', r'\bprovided that\b',
)


def _raw_to_band(raw: float) -> float:
    # piecewise-linear [0,1] → [1.0,8.0] calibrated to real IELTS score distributions
    raw = max(0.0, min(1.0, raw))
    if raw < 0.15:
        band = 1.0 + (raw / 0.15) * 2.0
    elif raw < 0.45:
        band = 3.0 + ((raw - 0.15) / 0.30) * 2.5
    elif raw < 0.75:
        band = 5.5 + ((raw - 0.45) / 0.30) * 1.5
    else:
        band = 7.0 + ((raw - 0.75) / 0.25) * 1.0
    return round(max(1.0, min(8.0, band)) * 2) / 2


def _score_task_achievement(task_type: str, word_count: int, para_count: int) -> float:
    min_words = 150 if task_type == "task1" else 250
    ideal_paras = 3 if task_type == "task1" else 4

    ratio = word_count / min_words
    if ratio >= 1.30:
        word_score = 1.00
    elif ratio >= 1.00:
        word_score = 0.78
    elif ratio >= 0.80:
        word_score = 0.52
    elif ratio >= 0.60:
        word_score = 0.30
    elif ratio >= 0.40:
        word_score = 0.12
    else:
        word_score = 0.03

    para_score = min(para_count / ideal_paras, 1.0)
    avg_para_words = word_count / max(para_count, 1)
    dev_score = min(avg_para_words / 75.0, 1.0)

    return word_score * 0.50 + para_score * 0.30 + dev_score * 0.20


def _score_coherence(linking_count: int, para_count: int, sentence_count: int) -> float:
    count_score = min(linking_count / 9.0, 1.0)
    density = linking_count / max(sentence_count, 1)
    density_score = min(density / 0.35, 1.0)
    para_score = min(para_count / 4.0, 1.0)

    return count_score * 0.40 + density_score * 0.30 + para_score * 0.30


def _score_lexical_resource(words: list, unique_words: set) -> float:
    word_count = len(words)
    if word_count == 0:
        return 0.0

    ttr = len(unique_words) / word_count
    ttr_score = min(ttr / 0.58, 1.0)

    soph_count = sum(1 for w in unique_words if w in ACADEMIC_VOCAB)
    soph_per_100 = soph_count / (word_count / 100.0)
    soph_score = min(soph_per_100 / 5.0, 1.0)

    long_count = sum(1 for w in words if len(w) > 8)
    long_score = min((long_count / word_count) / 0.12, 1.0)

    return ttr_score * 0.40 + soph_score * 0.40 + long_score * 0.20


def _score_grammar(text: str, sentences: list, word_count: int) -> float:
    sentence_count = max(len(sentences), 1)

    complex_hits = sum(
        len(re.findall(p, text, re.IGNORECASE)) for p in COMPLEX_PATTERNS
    )
    complex_score = min(complex_hits / max(sentence_count * 1.2, 1), 1.0)

    s_lengths = [len(re.findall(r'\b[a-zA-Z]+\b', s)) for s in sentences if s.strip()]
    if len(s_lengths) > 1:
        mean_l = sum(s_lengths) / len(s_lengths)
        variance = sum((l - mean_l) ** 2 for l in s_lengths) / len(s_lengths)
        variety_score = min(math.sqrt(variance) / 8.0, 1.0)
    else:
        variety_score = 0.0

    avg_len = word_count / sentence_count
    if 15 <= avg_len <= 22:
        len_score = 1.00
    elif 12 <= avg_len < 15 or 22 < avg_len <= 28:
        len_score = 0.70
    elif 8 <= avg_len < 12 or 28 < avg_len <= 35:
        len_score = 0.40
    else:
        len_score = 0.15

    return complex_score * 0.50 + variety_score * 0.30 + len_score * 0.20


def _build_feedback(
    task_type: str,
    word_count: int,
    para_count: int,
    sentence_count: int,
    linking_count: int,
    ttr: float,
    soph_count: int,
    complex_density: float,
    overall: float,
    ta: float, cc: float, lr: float, gr: float,
) -> tuple:
    min_words = 150 if task_type == "task1" else 250

    parts = []
    if overall >= 7.0:
        parts.append(f"This {task_type.upper()} response demonstrates a strong command of English.")
    elif overall >= 5.5:
        parts.append(
            f"This {task_type.upper()} response shows a reasonable level of English "
            "but has clear areas for improvement."
        )
    else:
        parts.append(
            f"This {task_type.upper()} response is at an early stage "
            "and needs significant development across all criteria."
        )

    if word_count < min_words:
        parts.append(
            f"At {word_count} words the essay falls below the {min_words}-word minimum, "
            "which directly penalises Task Achievement."
        )
    else:
        parts.append(f"The essay meets the word count requirement ({word_count} words).")

    if cc <= 4.5:
        parts.append("Coherence suffers from very few cohesive devices and unclear paragraph structure.")
    elif cc >= 7.0:
        parts.append("Ideas are logically sequenced with good use of cohesive devices.")

    if lr <= 4.5:
        parts.append("Lexical resource is limited, with noticeable word repetition across the essay.")
    elif lr >= 7.0:
        parts.append("A good range of vocabulary is used, including some less common and academic items.")

    if gr <= 4.5:
        parts.append("Grammatical range is narrow, relying mainly on simple sentence structures.")
    elif gr >= 7.0:
        parts.append("A variety of complex grammatical structures is used with reasonable accuracy.")

    feedback_text = " ".join(parts)

    sugs = []
    if word_count < min_words:
        sugs.append(
            f"Reach at least {min_words} words — being under-length is the fastest way "
            "to lose Task Achievement marks."
        )
    if task_type == "task2" and para_count < 4:
        sugs.append(
            "Use 4 paragraphs: introduction (state your position), "
            "two body paragraphs each developing one main idea with examples, "
            "and a conclusion that restates your view."
        )
    elif task_type == "task1" and para_count < 3:
        sugs.append(
            "Structure your response as: overview paragraph summarising the main trend, "
            "then 1–2 body paragraphs describing key features with data, "
            "then a brief concluding sentence."
        )
    if linking_count < 6:
        sugs.append(
            "Add varied cohesive devices: 'furthermore', 'nevertheless', "
            "'consequently', 'in contrast', 'as a result', 'to illustrate'. "
            "Aim for at least one per 2–3 sentences."
        )
    if ttr < 0.50:
        sugs.append(
            "Reduce word repetition — paraphrase key terms and use synonyms "
            "(e.g., 'advantage' → 'benefit', 'problem' → 'challenge', 'issue') "
            "to demonstrate lexical range."
        )
    if soph_count < 4:
        sugs.append(
            "Incorporate more academic vocabulary: 'significant', 'demonstrate', "
            "'facilitate', 'predominantly', 'consequently', 'substantial' — "
            "these lift your Lexical Resource band."
        )
    if complex_density < 0.8:
        sugs.append(
            "Write more complex sentences: use relative clauses ('which', 'who'), "
            "adverbial clauses ('although', 'because', 'despite the fact that'), "
            "and passive structures to show grammatical range."
        )
    if not sugs:
        sugs.append(
            "Focus on developing your arguments with more specific evidence, "
            "statistics, or real-world examples to push towards Band 8."
        )

    suggestions = "\n".join(f"{i + 1}. {s}" for i, s in enumerate(sugs))

    strs = []
    if word_count >= min_words:
        strs.append("meets the minimum word count requirement")
    if para_count >= (4 if task_type == "task2" else 3):
        strs.append("uses a clear multi-paragraph structure")
    if linking_count >= 7:
        strs.append("makes effective use of cohesive devices")
    if ttr >= 0.55:
        strs.append("demonstrates good vocabulary variety")
    if soph_count >= 5:
        strs.append("uses academic/less common vocabulary")
    if complex_density >= 1.0:
        strs.append("shows range in grammatical structures")
    if not strs:
        strs.append("attempts to address the task")

    strengths = "The response " + ", ".join(strs) + "."
    return feedback_text, suggestions, strengths


def _analyze_locally(task_type: str, essay: str) -> dict:
    # fallback when Groq is down; bands capped at 8.0
    text = essay.strip()

    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
    paragraphs = [p.strip() for p in re.split(r'\n\s*\n', text) if p.strip()]
    if len(paragraphs) <= 1:
        paragraphs = [p.strip() for p in text.split('\n') if p.strip()]

    words = re.findall(r'\b[a-zA-Z]+\b', text.lower())
    unique_words = set(words)
    word_count = len(words)
    sentence_count = max(len(sentences), 1)
    para_count = max(len(paragraphs), 1)
    ttr = len(unique_words) / word_count if word_count else 0.0

    text_lower = text.lower()
    linking_count = sum(1 for lw in LINKING_WORDS if lw in text_lower)
    soph_count = sum(1 for w in unique_words if w in ACADEMIC_VOCAB)
    complex_hits = sum(
        len(re.findall(p, text, re.IGNORECASE)) for p in COMPLEX_PATTERNS
    )
    complex_density = complex_hits / sentence_count

    ta = _raw_to_band(_score_task_achievement(task_type, word_count, para_count))
    cc = _raw_to_band(_score_coherence(linking_count, para_count, sentence_count))
    lr = _raw_to_band(_score_lexical_resource(words, unique_words))
    gr = _raw_to_band(_score_grammar(text, sentences, word_count))

    overall = round(((ta + cc + lr + gr) / 4) * 2) / 2
    overall = max(1.0, min(8.0, overall))

    feedback_text, suggestions, strengths = _build_feedback(
        task_type, word_count, para_count, sentence_count,
        linking_count, ttr, soph_count, complex_density,
        overall, ta, cc, lr, gr,
    )

    return {
        "overall_band": overall,
        "task_achievement": ta,
        "coherence_cohesion": cc,
        "lexical_resource": lr,
        "grammar_accuracy": gr,
        "feedback_text": feedback_text,
        "suggestions": suggestions,
        "strengths": strengths,
    }


async def get_ai_feedback(task_type: str, prompt: str, essay: str) -> dict:
    client = AsyncOpenAI(
        api_key=settings.GROQ_API_KEY,
        base_url="https://api.groq.com/openai/v1",
    )

    try:
        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert IELTS writing examiner. Return only valid JSON.",
                },
                {
                    "role": "user",
                    "content": IELTS_PROMPT.format(
                        task_type=task_type,
                        prompt=prompt or "General IELTS writing task",
                        essay=essay,
                    ),
                },
            ],
            temperature=0.3,
            max_tokens=1500,
        )

        content = response.choices[0].message.content.strip()

        # strip markdown fences if the model wraps its output
        if content.startswith("```"):
            content = content.split("\n", 1)[1]
            content = content.rsplit("```", 1)[0].strip()

        return json.loads(content)

    except Exception as e:
        logger.warning(f"Groq API failed ({e}), falling back to local analysis")
        return _analyze_locally(task_type, essay)
