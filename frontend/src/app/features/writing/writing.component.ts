import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="writing-page">
      <h1>Writing Practice</h1>
      <p class="subtitle">Submit your IELTS writing task for AI-powered feedback</p>

      <!-- Submit Form -->
      <div class="card submit-card">
        <h3>Submit New Essay</h3>

        <div class="form-row">
          <div class="form-group" style="flex:0 0 200px">
            <label>Task Type</label>
            <select [(ngModel)]="taskType">
              <option value="task1">Task 1 (Report/Letter)</option>
              <option value="task2">Task 2 (Essay)</option>
            </select>
          </div>
          <div class="form-group" style="flex:1">
            <label>Prompt / Question (optional)</label>
            <input type="text" [(ngModel)]="prompt"
                   placeholder="e.g. Some people believe that technology...">
          </div>
        </div>

        <div class="form-group">
          <label>Your Essay</label>
          <textarea [(ngModel)]="essay" rows="12"
                    placeholder="Write your IELTS essay here..."></textarea>
          <div class="word-count">{{ getWordCount() }} words</div>
        </div>

        <div class="error-msg" *ngIf="error">{{ error }}</div>

        <button class="btn btn-primary" (click)="onSubmit()" [disabled]="submitting">
          <span class="material-icons" *ngIf="!submitting">send</span>
          {{ submitting ? 'Getting AI Feedback...' : 'Submit for Feedback' }}
        </button>
      </div>

      <!-- Latest Result -->
      <div class="card result-card" *ngIf="latestResult">
        <h3>Latest Feedback</h3>
        <div class="band-grid">
          <div class="band-item overall">
            <span class="band-label">Overall</span>
            <span class="band-value">{{ latestResult.feedback?.overall_band }}</span>
          </div>
          <div class="band-item">
            <span class="band-label">Task Achievement</span>
            <span class="band-value">{{ latestResult.feedback?.task_achievement }}</span>
          </div>
          <div class="band-item">
            <span class="band-label">Coherence</span>
            <span class="band-value">{{ latestResult.feedback?.coherence_cohesion }}</span>
          </div>
          <div class="band-item">
            <span class="band-label">Lexical Resource</span>
            <span class="band-value">{{ latestResult.feedback?.lexical_resource }}</span>
          </div>
          <div class="band-item">
            <span class="band-label">Grammar</span>
            <span class="band-value">{{ latestResult.feedback?.grammar_accuracy }}</span>
          </div>
        </div>
        <div class="feedback-section" *ngIf="latestResult.feedback?.feedback_text">
          <h4>Detailed Feedback</h4>
          <p>{{ latestResult.feedback.feedback_text }}</p>
        </div>
        <div class="feedback-section" *ngIf="latestResult.feedback?.strengths">
          <h4>Strengths</h4>
          <p>{{ latestResult.feedback.strengths }}</p>
        </div>
        <div class="feedback-section" *ngIf="latestResult.feedback?.suggestions">
          <h4>Suggestions for Improvement</h4>
          <p class="suggestions">{{ latestResult.feedback.suggestions }}</p>
        </div>
      </div>

      <!-- History -->
      <div class="card">
        <h3>Writing History</h3>
        <div class="empty-state" *ngIf="history.length === 0 && !loading">
          <p>No submissions yet</p>
        </div>
        <table class="history-table" *ngIf="history.length > 0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Words</th>
              <th>Band</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let w of history" [routerLink]="['/writing', w.id]" class="clickable">
              <td>{{ w.created_at | date:'mediumDate' }}</td>
              <td><span class="badge badge-info">{{ w.task_type }}</span></td>
              <td>{{ w.word_count }}</td>
              <td class="band-cell">{{ w.feedback?.overall_band || '—' }}</td>
              <td><span class="material-icons">chevron_right</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .writing-page h1 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
    .subtitle { color: var(--text-secondary); margin-bottom: 24px; }
    .submit-card { margin-bottom: 24px; }
    .submit-card h3 { margin-bottom: 20px; }
    .form-row { display: flex; gap: 16px; }
    .word-count { font-size: 12px; color: var(--text-secondary); text-align: right; margin-top: 4px; }
    .error-msg {
      background: #fef2f2; color: #dc2626; padding: 10px; border-radius: 8px;
      font-size: 13px; margin-bottom: 12px;
    }

    .result-card { margin-bottom: 24px; }
    .result-card h3 { margin-bottom: 16px; }
    .band-grid {
      display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 20px;
    }
    .band-item {
      text-align: center; padding: 16px; border-radius: var(--radius-sm);
      background: var(--bg); border: 1px solid var(--border);
    }
    .band-item.overall {
      background: var(--primary); border: none;
    }
    .band-item.overall .band-label, .band-item.overall .band-value { color: white; }
    .band-label { display: block; font-size: 11px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; margin-bottom: 4px; }
    .band-value { display: block; font-size: 24px; font-weight: 800; color: var(--text); }

    .feedback-section { margin-bottom: 16px; }
    .feedback-section h4 { font-size: 14px; font-weight: 700; margin-bottom: 8px; color: var(--text); }
    .feedback-section p { font-size: 14px; line-height: 1.7; color: var(--text-secondary); }
    .suggestions { white-space: pre-line; }

    .history-table { width: 100%; border-collapse: collapse; }
    .history-table th {
      text-align: left; padding: 10px 12px; font-size: 12px;
      text-transform: uppercase; color: var(--text-secondary); border-bottom: 2px solid var(--border);
    }
    .history-table td { padding: 12px; border-bottom: 1px solid var(--border); font-size: 14px; }
    .clickable { cursor: pointer; transition: background 0.15s; }
    .clickable:hover { background: rgba(26,86,219,0.03); }
    .band-cell { font-weight: 700; color: var(--primary); font-size: 16px; }

    .card { margin-bottom: 24px; }
    .card h3 { font-size: 16px; margin-bottom: 16px; }
    .empty-state { text-align: center; padding: 24px; color: var(--text-light); }
  `],
})
export class WritingComponent implements OnInit {
  taskType = 'task2';
  prompt = '';
  essay = '';
  error = '';
  submitting = false;
  latestResult: any = null;
  history: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadHistory();
  }

  getWordCount(): number {
    return this.essay.trim() ? this.essay.trim().split(/\s+/).length : 0;
  }

  loadHistory() {
    this.api.getWritingHistory().subscribe({
      next: (h) => { this.history = h; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  onSubmit() {
    if (this.getWordCount() < 5) {
      this.error = 'Please write at least a few sentences';
      return;
    }
    this.error = '';
    this.submitting = true;
    this.api.submitWriting({
      task_type: this.taskType,
      prompt: this.prompt || undefined,
      essay: this.essay,
    }).subscribe({
      next: (result) => {
        this.latestResult = result;
        this.submitting = false;
        this.essay = '';
        this.prompt = '';
        this.loadHistory();
      },
      error: (err) => {
        this.error = err.error?.detail || 'Submission failed';
        this.submitting = false;
      },
    });
  }
}
