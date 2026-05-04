import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-exam-take',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Loading -->
    <div class="loading" *ngIf="!exam && !result">
      <span class="material-icons spin">hourglass_top</span>
      <p>Loading exam...</p>
    </div>

    <!-- Exam In Progress -->
    <div class="exam-page" *ngIf="exam && !result">
      <div class="exam-header">
        <div>
          <h1>{{ exam.title }}</h1>
          <p class="exam-info">{{ exam.questions.length }} questions · {{ exam.difficulty }}</p>
        </div>
        <div class="timer" [class.warning]="timeRemaining < 300">
          <span class="material-icons">timer</span>
          {{ formatTimer(timeRemaining) }}
        </div>
      </div>

      <!-- Passage (shown once for reading) -->
      <div class="card passage-card" *ngIf="getPassage()">
        <h3>Reading Passage</h3>
        <div class="passage-text">{{ getPassage() }}</div>
      </div>

      <!-- Questions -->
      <div class="questions">
        <div class="card question-card" *ngFor="let q of exam.questions; let i = index">
          <div class="q-number">Question {{ i + 1 }}</div>
          <p class="q-text">{{ q.question_text }}</p>

          <!-- Multiple Choice -->
          <div class="options" *ngIf="q.question_type === 'multiple_choice'">
            <label class="option" *ngFor="let opt of q.options"
                   [class.selected]="answers[q.id] === opt">
              <input type="radio" [name]="'q' + q.id" [value]="opt"
                     [(ngModel)]="answers[q.id]">
              <span class="option-text">{{ opt }}</span>
            </label>
          </div>

          <!-- True/False/Not Given -->
          <div class="options" *ngIf="q.question_type === 'true_false_notgiven'">
            <label class="option" *ngFor="let opt of q.options"
                   [class.selected]="answers[q.id] === opt">
              <input type="radio" [name]="'q' + q.id" [value]="opt"
                     [(ngModel)]="answers[q.id]">
              <span class="option-text">{{ opt }}</span>
            </label>
          </div>

          <!-- Fill in blank -->
          <div *ngIf="q.question_type === 'fill_blank'" class="form-group" style="margin-top:12px">
            <input type="text" [(ngModel)]="answers[q.id]" placeholder="Type your answer...">
          </div>
        </div>
      </div>

      <div class="submit-bar">
        <span class="answered-count">
          {{ getAnsweredCount() }} / {{ exam.questions.length }} answered
        </span>
        <button class="btn btn-primary" (click)="onSubmit()" [disabled]="submitting">
          {{ submitting ? 'Submitting...' : 'Submit Exam' }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div class="result-page" *ngIf="result">
      <div class="result-banner" [class.good]="result.score >= 7" [class.ok]="result.score >= 5 && result.score < 7">
        <h1>Exam Complete!</h1>
        <div class="result-score">{{ result.score }}</div>
        <p>Band Score</p>
        <p class="result-detail">
          {{ result.correct_answers }} / {{ result.total_questions }} correct
          · {{ formatTimer(result.time_spent) }}
        </p>
      </div>

      <div class="card" *ngIf="result.answers">
        <h3>Answer Review</h3>
        <div class="review-item" *ngFor="let a of result.answers; let i = index"
             [class.correct]="a.is_correct" [class.wrong]="!a.is_correct">
          <span class="review-num">{{ i + 1 }}</span>
          <div class="review-body">
            <span class="review-given">Your answer: {{ a.given_answer || '(skipped)' }}</span>
            <span class="review-correct" *ngIf="!a.is_correct">Correct: {{ a.correct_answer }}</span>
          </div>
          <span class="material-icons review-icon">{{ a.is_correct ? 'check_circle' : 'cancel' }}</span>
        </div>
      </div>

      <button class="btn btn-secondary" (click)="goBack()">Back to Exams</button>
    </div>
  `,
  styles: [`
    .exam-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
    }
    .exam-header h1 { font-size: 22px; font-weight: 800; }
    .exam-info { color: var(--text-secondary); font-size: 14px; }
    .timer {
      display: flex; align-items: center; gap: 8px;
      font-size: 20px; font-weight: 700; color: var(--text);
      background: var(--bg-card); padding: 12px 20px; border-radius: var(--radius);
      border: 1.5px solid var(--border);
    }
    .timer.warning { color: var(--danger); border-color: var(--danger); }

    .passage-card { margin-bottom: 24px; }
    .passage-card h3 { margin-bottom: 12px; }
    .passage-text { white-space: pre-wrap; line-height: 1.8; font-size: 15px; }

    .question-card { margin-bottom: 16px; }
    .q-number { font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 8px; }
    .q-text { font-size: 15px; font-weight: 600; margin-bottom: 14px; line-height: 1.5; }
    .options { display: flex; flex-direction: column; gap: 8px; }
    .option {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
      cursor: pointer; transition: all 0.15s; font-size: 14px;
    }
    .option:hover { border-color: var(--primary-light); background: rgba(26,86,219,0.03); }
    .option.selected { border-color: var(--primary); background: rgba(26,86,219,0.06); }
    .option input { accent-color: var(--primary); }

    .submit-bar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 0; margin-top: 16px; border-top: 2px solid var(--border);
    }
    .answered-count { font-size: 14px; color: var(--text-secondary); font-weight: 600; }

    .result-banner {
      text-align: center; padding: 48px; border-radius: var(--radius);
      background: linear-gradient(135deg, #f59e0b, #f97316); color: white; margin-bottom: 24px;
    }
    .result-banner.good { background: linear-gradient(135deg, #10b981, #059669); }
    .result-banner h1 { font-size: 24px; margin-bottom: 12px; }
    .result-score { font-size: 64px; font-weight: 800; }
    .result-detail { opacity: 0.85; margin-top: 8px; }

    .review-item {
      display: flex; align-items: center; gap: 14px;
      padding: 12px 0; border-bottom: 1px solid var(--border);
    }
    .review-num {
      width: 28px; height: 28px; border-radius: 50%; display: flex;
      align-items: center; justify-content: center; font-weight: 700; font-size: 12px;
    }
    .review-item.correct .review-num { background: #ecfdf5; color: #065f46; }
    .review-item.wrong .review-num { background: #fef2f2; color: #dc2626; }
    .review-body { flex: 1; }
    .review-given { display: block; font-size: 14px; }
    .review-correct { display: block; font-size: 13px; color: var(--success); font-weight: 600; }
    .review-icon { font-size: 22px; }
    .review-item.correct .review-icon { color: var(--success); }
    .review-item.wrong .review-icon { color: var(--danger); }

    .card h3 { font-size: 16px; margin-bottom: 16px; }
    .loading { text-align: center; padding: 80px 0; color: var(--text-secondary); }
    .spin { animation: spin 1s linear infinite; font-size: 32px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
})
export class ExamTakeComponent implements OnInit, OnDestroy {
  exam: any = null;
  result: any = null;
  answers: Record<number, string> = {};
  submitting = false;
  timeRemaining = 0;
  private timerInterval: any;
  private startTime = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.api.getExam(id).subscribe({
      next: (exam) => {
        this.exam = exam;
        this.timeRemaining = exam.time_limit * 60;
        this.startTime = Date.now();
        this.startTimer();
      },
    });
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.onSubmit();
      }
    }, 1000);
  }

  formatTimer(seconds: number): string {
    const m = Math.floor(Math.abs(seconds) / 60);
    const s = Math.abs(seconds) % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  getPassage(): string | null {
    const first = this.exam?.questions?.find((q: any) => q.passage_text);
    return first?.passage_text || null;
  }

  getAnsweredCount(): number {
    return Object.values(this.answers).filter(a => a).length;
  }

  onSubmit() {
    clearInterval(this.timerInterval);
    this.submitting = true;
    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    const answerList = this.exam.questions.map((q: any) => ({
      question_id: q.id,
      answer: this.answers[q.id] || '',
    }));

    this.api.submitExam({
      exam_id: this.exam.id,
      answers: answerList,
      time_spent: timeSpent,
    }).subscribe({
      next: (res) => {
        this.result = res;
        this.submitting = false;
      },
      error: () => { this.submitting = false; },
    });
  }

  goBack() {
    this.router.navigate(['/exams']);
  }
}
