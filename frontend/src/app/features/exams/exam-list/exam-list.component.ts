import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="exams-page">
      <h1>Mock Exams</h1>
      <p class="subtitle">Practice with reading and listening tests</p>

      <!-- Filter -->
      <div class="filter-bar">
        <button class="filter-btn" [class.active]="filter === ''" (click)="setFilter('')">All</button>
        <button class="filter-btn" [class.active]="filter === 'reading'" (click)="setFilter('reading')">
          <span class="material-icons">menu_book</span> Reading
        </button>
        <button class="filter-btn" [class.active]="filter === 'listening'" (click)="setFilter('listening')">
          <span class="material-icons">headphones</span> Listening
        </button>
      </div>

      <!-- Exam Cards -->
      <div class="exam-grid">
        <div class="card exam-card" *ngFor="let exam of filteredExams">
          <div class="exam-type-badge" [class.reading]="exam.exam_type === 'reading'"
               [class.listening]="exam.exam_type === 'listening'">
            <span class="material-icons">{{ exam.exam_type === 'reading' ? 'menu_book' : 'headphones' }}</span>
            {{ exam.exam_type | titlecase }}
          </div>
          <h3>{{ exam.title }}</h3>
          <p class="exam-desc">{{ exam.description }}</p>
          <div class="exam-meta">
            <span><span class="material-icons">timer</span> {{ exam.time_limit }} min</span>
            <span><span class="material-icons">help_outline</span> {{ exam.question_count }} questions</span>
            <span class="badge" [ngClass]="{
              'badge-success': exam.difficulty === 'intermediate',
              'badge-warning': exam.difficulty === 'advanced'
            }">{{ exam.difficulty }}</span>
          </div>
          <a [routerLink]="['/exams', exam.id]" class="btn btn-primary" style="width:100%; margin-top: 16px;">
            Start Exam
          </a>
        </div>
      </div>

      <div class="empty-state" *ngIf="filteredExams.length === 0 && !loading">
        <span class="material-icons">quiz</span>
        <p>No exams available for this filter</p>
      </div>

      <!-- Past Results -->
      <div class="card" style="margin-top: 32px;" *ngIf="results.length > 0">
        <h3>Your Past Results</h3>
        <table class="history-table">
          <thead>
            <tr><th>Date</th><th>Score</th><th>Correct</th><th>Time</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of results">
              <td>{{ r.created_at | date:'mediumDate' }}</td>
              <td class="band-cell">{{ r.score }}</td>
              <td>{{ r.correct_answers }}/{{ r.total_questions }}</td>
              <td>{{ formatTime(r.time_spent) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .exams-page h1 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
    .subtitle { color: var(--text-secondary); margin-bottom: 24px; }

    .filter-bar { display: flex; gap: 8px; margin-bottom: 24px; }
    .filter-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 20px; border: 1.5px solid var(--border);
      background: white; font-family: var(--font); font-weight: 600; font-size: 13px;
      cursor: pointer; transition: all 0.2s; color: var(--text-secondary);
    }
    .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
    .filter-btn .material-icons { font-size: 16px; }

    .exam-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .exam-card { display: flex; flex-direction: column; }
    .exam-type-badge {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 700; text-transform: uppercase;
      margin-bottom: 12px;
    }
    .exam-type-badge.reading { color: var(--primary); }
    .exam-type-badge.listening { color: #8b5cf6; }
    .exam-type-badge .material-icons { font-size: 18px; }
    .exam-card h3 { font-size: 16px; margin-bottom: 8px; }
    .exam-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.5; flex: 1; }
    .exam-meta {
      display: flex; gap: 12px; align-items: center; margin-top: 12px;
      font-size: 12px; color: var(--text-secondary);
    }
    .exam-meta span { display: flex; align-items: center; gap: 4px; }
    .exam-meta .material-icons { font-size: 14px; }

    .history-table { width: 100%; border-collapse: collapse; }
    .history-table th {
      text-align: left; padding: 10px 12px; font-size: 12px;
      text-transform: uppercase; color: var(--text-secondary); border-bottom: 2px solid var(--border);
    }
    .history-table td { padding: 12px; border-bottom: 1px solid var(--border); font-size: 14px; }
    .band-cell { font-weight: 700; color: var(--primary); }
    .card h3 { font-size: 16px; margin-bottom: 16px; }

    .empty-state { text-align: center; padding: 40px; color: var(--text-light); }
    .empty-state .material-icons { font-size: 48px; opacity: 0.3; margin-bottom: 8px; }
  `],
})
export class ExamListComponent implements OnInit {
  exams: any[] = [];
  results: any[] = [];
  filter = '';
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getExams().subscribe({ next: (e) => { this.exams = e; this.loading = false; } });
    this.api.getExamHistory().subscribe({ next: (r) => this.results = r });
  }

  get filteredExams() {
    return this.filter ? this.exams.filter(e => e.exam_type === this.filter) : this.exams;
  }

  setFilter(f: string) { this.filter = f; }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }
}
