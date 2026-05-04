import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-submission-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="submission" class="detail-page">
      <a routerLink="/writing" class="back-link">
        <span class="material-icons">arrow_back</span> Back to Writing
      </a>

      <div class="header-row">
        <div>
          <h1>Writing Submission</h1>
          <p class="meta">
            <span class="badge badge-info">{{ submission.task_type }}</span>
            {{ submission.created_at | date:'medium' }} · {{ submission.word_count }} words
          </p>
        </div>
        <div class="overall-band" *ngIf="submission.feedback">
          <span class="band-number">{{ submission.feedback.overall_band }}</span>
          <span class="band-text">Overall Band</span>
        </div>
      </div>

      <!-- Band Scores -->
      <div class="card band-grid" *ngIf="submission.feedback">
        <div class="band-item" *ngFor="let item of bandItems">
          <div class="band-bar-bg">
            <div class="band-bar-fill" [style.width.%]="(item.value / 9) * 100"></div>
          </div>
          <div class="band-info">
            <span class="band-name">{{ item.label }}</span>
            <span class="band-score">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- Essay Text -->
      <div class="card">
        <h3>Your Essay</h3>
        <p class="prompt" *ngIf="submission.prompt">Prompt: {{ submission.prompt }}</p>
        <div class="essay-text">{{ submission.essay }}</div>
      </div>

      <!-- Feedback -->
      <div class="card" *ngIf="submission.feedback">
        <h3>AI Feedback</h3>
        <p class="feedback-text">{{ submission.feedback.feedback_text }}</p>

        <div class="section" *ngIf="submission.feedback.strengths">
          <h4>✅ Strengths</h4>
          <p>{{ submission.feedback.strengths }}</p>
        </div>

        <div class="section" *ngIf="submission.feedback.suggestions">
          <h4>💡 Suggestions</h4>
          <p class="suggestions">{{ submission.feedback.suggestions }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .back-link {
      display: inline-flex; align-items: center; gap: 6px;
      color: var(--primary); font-weight: 600; font-size: 14px; margin-bottom: 20px;
    }
    .header-row {
      display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;
    }
    .header-row h1 { font-size: 24px; font-weight: 800; }
    .meta { color: var(--text-secondary); font-size: 14px; margin-top: 6px; display: flex; align-items: center; gap: 8px; }
    .overall-band {
      text-align: center; background: var(--primary); color: white;
      padding: 16px 24px; border-radius: var(--radius);
    }
    .band-number { display: block; font-size: 36px; font-weight: 800; }
    .band-text { font-size: 12px; opacity: 0.8; }

    .band-grid { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
    .band-item { display: flex; align-items: center; gap: 16px; }
    .band-bar-bg {
      flex: 1; height: 10px; background: var(--border); border-radius: 5px; overflow: hidden;
    }
    .band-bar-fill {
      height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent));
      border-radius: 5px; transition: width 0.5s;
    }
    .band-info { display: flex; align-items: center; gap: 8px; min-width: 200px; }
    .band-name { font-size: 13px; color: var(--text-secondary); width: 140px; }
    .band-score { font-weight: 700; font-size: 16px; }

    .card { margin-bottom: 24px; }
    .card h3 { font-size: 16px; font-weight: 700; margin-bottom: 14px; }
    .prompt { font-style: italic; color: var(--text-secondary); margin-bottom: 12px; font-size: 14px; }
    .essay-text { white-space: pre-wrap; line-height: 1.8; font-size: 15px; }
    .feedback-text { line-height: 1.7; font-size: 14px; color: var(--text-secondary); margin-bottom: 16px; }
    .section { margin-bottom: 16px; }
    .section h4 { font-size: 14px; margin-bottom: 8px; }
    .section p { font-size: 14px; line-height: 1.7; color: var(--text-secondary); }
    .suggestions { white-space: pre-line; }
  `],
})
export class SubmissionDetailComponent implements OnInit {
  submission: any = null;
  bandItems: { label: string; value: number }[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.api.getSubmission(id).subscribe({
      next: (s) => {
        this.submission = s;
        if (s.feedback) {
          this.bandItems = [
            { label: 'Task Achievement', value: s.feedback.task_achievement },
            { label: 'Coherence & Cohesion', value: s.feedback.coherence_cohesion },
            { label: 'Lexical Resource', value: s.feedback.lexical_resource },
            { label: 'Grammar Accuracy', value: s.feedback.grammar_accuracy },
          ];
        }
      },
    });
  }
}
