
-- Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    target_band DECIMAL(2,1) DEFAULT 7.0,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Writing Submissions
CREATE TABLE IF NOT EXISTS writing_submissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_type VARCHAR(10) NOT NULL CHECK (task_type IN ('task1', 'task2')),
    prompt TEXT,
    essay TEXT NOT NULL,
    word_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Feedback
CREATE TABLE IF NOT EXISTS ai_feedback (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL REFERENCES writing_submissions(id) ON DELETE CASCADE,
    overall_band DECIMAL(2,1),
    task_achievement DECIMAL(2,1),
    coherence_cohesion DECIMAL(2,1),
    lexical_resource DECIMAL(2,1),
    grammar_accuracy DECIMAL(2,1),
    feedback_text TEXT,
    suggestions TEXT,
    strengths TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mock Exams
CREATE TABLE IF NOT EXISTS mock_exams (
    id SERIAL PRIMARY KEY,
    exam_type VARCHAR(20) NOT NULL CHECK (exam_type IN ('reading', 'listening')),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    time_limit INTEGER DEFAULT 60,
    difficulty VARCHAR(20) DEFAULT 'intermediate',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exam Questions
CREATE TABLE IF NOT EXISTS exam_questions (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER NOT NULL REFERENCES mock_exams(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL CHECK (question_type IN ('multiple_choice', 'fill_blank', 'true_false_notgiven')),
    options JSONB,
    correct_answer VARCHAR(500) NOT NULL,
    passage_text TEXT,
    audio_url VARCHAR(500),
    order_num INTEGER DEFAULT 0
);

-- Exam Results
CREATE TABLE IF NOT EXISTS exam_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exam_id INTEGER NOT NULL REFERENCES mock_exams(id) ON DELETE CASCADE,
    score DECIMAL(4,1),
    total_questions INTEGER,
    correct_answers INTEGER,
    time_spent INTEGER DEFAULT 0,
    answers JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Progress (Gamification)
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    total_writings INTEGER DEFAULT 0,
    total_exams INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges
CREATE TABLE IF NOT EXISTS badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'star',
    requirement_type VARCHAR(50) NOT NULL,
    requirement_value INTEGER NOT NULL
);

-- User Badges (junction)
CREATE TABLE IF NOT EXISTS user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id INTEGER NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- seed data
INSERT INTO badges (name, description, icon, requirement_type, requirement_value) VALUES
('First Steps',       'Submit your first writing',           'edit',    'writings', 1),
('Prolific Writer',   'Submit 10 writings',                  'feather', 'writings', 10),
('Writing Master',    'Submit 50 writings',                  'award',   'writings', 50),
('On Fire',           'Maintain a 7-day streak',             'flame',   'streak',   7),
('Unstoppable',       'Maintain a 30-day streak',            'zap',     'streak',   30),
('Level 5',           'Reach level 5',                       'star',    'level',    5),
('Level 10',          'Reach level 10',                      'trophy',  'level',    10),
('Quiz Taker',        'Complete 5 mock exams',               'book',    'exams',    5),
('Exam Veteran',      'Complete 20 mock exams',              'shield',  'exams',    20),
('High Scorer',       'Score 7+ on a writing submission',    'target',  'band',     7);

-- ============================================
-- Seed Data: Sample Mock Exams
-- ============================================
INSERT INTO mock_exams (exam_type, title, description, time_limit, difficulty) VALUES
('reading', 'Academic Reading Test 1', 'Practice academic reading with 3 passages about technology, environment, and education.', 60, 'intermediate'),
('reading', 'Academic Reading Test 2', 'Reading comprehension focusing on scientific and social topics.', 60, 'advanced'),
('listening', 'Listening Practice 1', 'Four-section listening test covering everyday and academic contexts.', 30, 'intermediate');

-- Sample Reading Questions for Test 1
INSERT INTO exam_questions (exam_id, question_text, question_type, options, correct_answer, passage_text, order_num) VALUES
(1, 'According to the passage, what is the primary benefit of AI in education?',
 'multiple_choice',
 '["Replacing teachers entirely", "Providing personalized learning paths", "Reducing education costs", "Eliminating homework"]',
 'Providing personalized learning paths',
 'Artificial Intelligence in Education

Artificial intelligence is transforming education in unprecedented ways. The primary benefit lies in its ability to provide personalized learning paths for each student. Rather than a one-size-fits-all approach, AI systems can analyze individual learning patterns, identify strengths and weaknesses, and adapt content accordingly.

Research from leading universities suggests that students using AI-powered platforms show a 25% improvement in test scores compared to traditional methods. The technology does not aim to replace teachers but rather to augment their capabilities, allowing them to focus on mentoring and creative instruction while AI handles routine assessment and content delivery.

However, concerns about data privacy, algorithmic bias, and the digital divide remain significant challenges that educators and policymakers must address as these technologies become more widespread in classrooms worldwide.',
 1),

(1, 'The passage states that students using AI platforms showed improvement of:',
 'multiple_choice',
 '["15%", "20%", "25%", "30%"]',
 '25%',
 NULL, 2),

(1, 'AI in education aims to replace teachers.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'False',
 NULL, 3),

(1, 'The passage mentions concerns about data privacy.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'True',
 NULL, 4),

(1, 'AI education tools are most effective for university students.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'Not Given',
 NULL, 5),

(1, 'What challenge is NOT mentioned in the passage?',
 'multiple_choice',
 '["Data privacy", "Algorithmic bias", "Teacher resistance", "Digital divide"]',
 'Teacher resistance',
 NULL, 6),

(1, 'The word "augment" in the passage is closest in meaning to:',
 'multiple_choice',
 '["Replace", "Enhance", "Reduce", "Ignore"]',
 'Enhance',
 NULL, 7),

(1, 'According to the research, AI-powered platforms help students by:',
 'multiple_choice',
 '["Making classes shorter", "Analyzing individual learning patterns", "Providing free textbooks", "Scheduling classes automatically"]',
 'Analyzing individual learning patterns',
 NULL, 8);
INSERT INTO exam_questions (exam_id, question_text, question_type, options, correct_answer, passage_text, order_num) VALUES
(2, 'What is the main argument presented in the passage?',
 'multiple_choice',
 '["Climate change is irreversible", "Renewable energy can replace fossil fuels entirely", "International cooperation is essential for addressing climate change", "Individual actions have no impact on climate change"]',
 'International cooperation is essential for addressing climate change',
 'The Challenge of Global Climate Action

The response to climate change represents one of the most complex challenges in international relations. While individual nations have made significant pledges to reduce carbon emissions, the effectiveness of these commitments depends heavily on coordinated global action. The Paris Agreement of 2015 marked a watershed moment, bringing together 196 parties in a collective framework to limit global warming to well below 2 degrees Celsius above pre-industrial levels.

However, critics argue that voluntary commitments are insufficient without binding enforcement mechanisms. Research from the International Energy Agency indicates that current policies would result in a temperature rise of approximately 2.7 degrees Celsius by 2100, falling short of stated goals. The gap between ambition and action remains a central concern.

Developing nations face a particular dilemma: balancing economic growth with environmental responsibility. Many argue that developed countries, having historically contributed the most to greenhouse gas emissions, bear a greater obligation to lead the transition to clean energy. This tension between equity and urgency continues to shape negotiations at annual climate summits.

Despite these challenges, technological innovation offers reasons for optimism. The cost of solar energy has declined by 89 percent since 2010, making renewable energy increasingly competitive with fossil fuels. Electric vehicle adoption is accelerating globally, and advances in battery storage technology are addressing intermittency concerns associated with renewable energy sources.',
 1),

(2, 'According to the passage, the Paris Agreement was signed in:',
 'multiple_choice',
 '["2010", "2013", "2015", "2020"]',
 '2015',
 NULL, 2),

(2, 'Current policies are expected to limit warming to 2 degrees Celsius.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'False',
 NULL, 3),

(2, 'Solar energy costs have decreased by 89 percent since 2010.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'True',
 NULL, 4),

(2, 'China has made the largest financial commitment to the Paris Agreement.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'Not Given',
 NULL, 5),

(2, 'The word "watershed" in the passage is closest in meaning to:',
 'multiple_choice',
 '["Controversial", "Historic turning point", "Minor event", "Predictable"]',
 'Historic turning point',
 NULL, 6),

(2, 'According to the passage, developing nations face a dilemma between:',
 'multiple_choice',
 '["Technology and tradition", "Economic growth and environmental responsibility", "Urban and rural development", "Education and employment"]',
 'Economic growth and environmental responsibility',
 NULL, 7),

(2, 'The passage suggests that the Paris Agreement includes binding enforcement mechanisms.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'False',
 NULL, 8),

(2, 'How many parties joined the Paris Agreement?',
 'multiple_choice',
 '["150", "175", "196", "200"]',
 '196',
 NULL, 9),

(2, 'The passage expresses overall pessimism about addressing climate change.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'False',
 NULL, 10);

INSERT INTO exam_questions (exam_id, question_text, question_type, options, correct_answer, passage_text, order_num) VALUES
(3, 'In the conversation, the student wants to register for:',
 'multiple_choice',
 '["A language course", "An exam preparation workshop", "A university orientation", "A library card"]',
 'An exam preparation workshop',
 'Listening Section 1 — University Registration

The following is a transcript of a conversation between a student and a university administrator.

Administrator: Good morning, how can I help you today?
Student: Hi, I would like to register for the IELTS exam preparation workshop that was advertised on the university notice board.
Administrator: Of course. The workshop runs for six weeks, starting on the 15th of March. Sessions are held every Tuesday and Thursday from 2 PM to 4 PM in Room 305 of the Language Centre.
Student: That sounds perfect. Is there a fee for the workshop?
Administrator: Yes, there is a registration fee of 45 dollars, which covers all materials. You will receive a coursebook, practice test booklets, and access to online resources.
Student: Great. I am particularly interested in improving my writing and speaking scores. Will both be covered?
Administrator: Absolutely. The first three weeks focus on writing, covering both Task 1 and Task 2. The remaining three weeks concentrate on speaking, including mock interview sessions with feedback from certified examiners.
Student: That is exactly what I need. Can I pay by card?
Administrator: Yes, we accept both cash and card payments. I will also need your student ID number and a contact email address for registration.',
 1),

(3, 'The workshop lasts for:',
 'multiple_choice',
 '["Four weeks", "Five weeks", "Six weeks", "Eight weeks"]',
 'Six weeks',
 NULL, 2),

(3, 'Sessions are held on Mondays and Wednesdays.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'False',
 NULL, 3),

(3, 'The registration fee is:',
 'multiple_choice',
 '["35 dollars", "40 dollars", "45 dollars", "50 dollars"]',
 '45 dollars',
 NULL, 4),

(3, 'The first three weeks focus on:',
 'multiple_choice',
 '["Speaking skills", "Reading skills", "Writing skills", "Listening skills"]',
 'Writing skills',
 NULL, 5),

(3, 'Mock interview sessions include feedback from certified examiners.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'True',
 NULL, 6),

(3, 'The student can pay by credit card.',
 'true_false_notgiven',
 '["True", "False", "Not Given"]',
 'True',
 NULL, 7),

(3, 'The workshop takes place in:',
 'multiple_choice',
 '["Room 105", "Room 205", "Room 305", "Room 405"]',
 'Room 305',
 NULL, 8);