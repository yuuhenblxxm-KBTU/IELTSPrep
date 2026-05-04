import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard" *ngIf="data">
      <!-- Welcome -->
      <div class="welcome-banner">
        <div>
          <h1>Welcome back, {{ getDisplayName() }}!</h1>
          <p>Target Band: {{ getUserBand() }} — Keep pushing forward</p>
        </div>
        <div class="welcome-actions">
          <a routerLink="/writing" class="btn btn-white">New Writing</a>
          <a routerLink="/exams" class="btn btn-outline">Take Exam</a>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-card">
          <span class="material-icons stat-icon" style="color: var(--primary)">trending_up</span>
          <div class="stat-info">
            <span class="stat-value">Level {{ data.progress?.level || 1 }}</span>
            <span class="stat-label">{{ data.progress?.xp || 0 }} XP</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons stat-icon" style="color: var(--accent)">local_fire_department</span>
          <div class="stat-info">
            <span class="stat-value">{{ data.progress?.current_streak || 0 }} days</span>
            <span class="stat-label">Current streak</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons stat-icon" style="color: var(--success)">edit_note</span>
          <div class="stat-info">
            <span class="stat-value">{{ data.progress?.total_writings || 0 }}</span>
            <span class="stat-label">Writings submitted</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons stat-icon" style="color: #8b5cf6">quiz</span>
          <div class="stat-info">
            <span class="stat-value">{{ data.progress?.total_exams || 0 }}</span>
            <span class="stat-label">Exams taken</span>
          </div>
        </div>
      </div>

      <!-- XP Progress Bar -->
      <div class="card xp-bar-card" *ngIf="data.progress">
        <div class="xp-header">
          <span>Level {{ data.progress.level }}</span>
          <span>Level {{ data.progress.level + 1 }}</span>
        </div>
        <div class="xp-bar">
          <div class="xp-fill" [style.width.%]="getXpPercent()"></div>
        </div>
        <p class="xp-text">{{ data.progress.xp_to_next_level }} XP to next level</p>
      </div>

      <!-- Quick Actions + Tips -->
      <div class="two-col">
        <div class="card">
          <h3>Quick actions</h3>
          <div class="quick-actions">
            <a routerLink="/writing" class="action-card">
              <span class="material-icons action-icon" style="color: var(--primary)">edit_note</span>
              <div>
                <strong>Practice writing</strong>
                <p>Submit a Task 1 or Task 2 essay and get AI feedback</p>
              </div>
              <span class="material-icons">chevron_right</span>
            </a>
            <a routerLink="/exams" class="action-card">
              <span class="material-icons action-icon" style="color: #8b5cf6">quiz</span>
              <div>
                <strong>Take a mock exam</strong>
                <p>Practice reading and listening with timed tests</p>
              </div>
              <span class="material-icons">chevron_right</span>
            </a>
            <a routerLink="/profile" class="action-card">
              <span class="material-icons action-icon" style="color: var(--success)">person</span>
              <div>
                <strong>Update your profile</strong>
                <p>Set your target band and manage your account</p>
              </div>
              <span class="material-icons">chevron_right</span>
            </a>
          </div>
        </div>

        <div class="card">
          <h3>IELTS tips</h3>
          <div class="tips-list">
            <div class="tip-item" *ngFor="let tip of tips">
              <span class="tip-icon">{{ tip.icon }}</span>
              <div>
                <strong>{{ tip.title }}</strong>
                <p>{{ tip.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Band History Chart -->
      <div class="card chart-card" *ngIf="data.writing_band_history?.length > 0">
        <h3>Writing band progress</h3>
        <canvas #bandChart></canvas>
      </div>

      <!-- Recent Activity + Badges -->
      <div class="two-col">
        <div class="card">
          <h3>Recent writings</h3>
          <div class="empty-state" *ngIf="!data.recent_writings?.length">
            <span class="material-icons">edit_note</span>
            <p>No writings yet</p>
            <a routerLink="/writing" class="btn btn-primary btn-sm">Submit your first essay</a>
          </div>
          <div class="list-item" *ngFor="let w of data.recent_writings" [routerLink]="['/writing', w.id]">
            <div class="list-left">
              <span class="badge badge-info">{{ w.task_type }}</span>
              <span class="list-date">{{ w.created_at | date:'mediumDate' }}</span>
            </div>
            <div class="list-right">
              <span class="band-score" *ngIf="w.feedback">{{ w.feedback.overall_band }}</span>
              <span class="material-icons arrow">chevron_right</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Badges ({{ getEarnedCount() }}/{{ data.badges?.length || 0 }})</h3>
          <div class="badges-grid" *ngIf="data.badges?.length > 0">
            <div class="badge-item" *ngFor="let b of data.badges"
                 [class.earned]="b.earned" [class.locked]="!b.earned">
              <span class="material-icons badge-icon">{{ getBadgeIcon(b.icon) }}</span>
              <span class="badge-name">{{ b.name }}</span>
              <span class="badge-desc">{{ b.description }}</span>
            </div>
          </div>
          <div class="empty-state" *ngIf="!data.badges?.length">
            <span class="material-icons">emoji_events</span>
            <p>Complete activities to earn badges!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div class="loading" *ngIf="loading && !error">
      <span class="material-icons spin">hourglass_top</span>
      <p>Loading dashboard...</p>
    </div>

    <!-- Error state -->
    <div class="error-state" *ngIf="error">
      <span class="material-icons">warning</span>
      <p>{{ error }}</p>
      <button class="btn btn-secondary" (click)="loadDashboard()">Retry</button>
    </div>
  `,
  styles: [`
    .welcome-banner {
      display: flex; align-items: center; justify-content: space-between;
      background: linear-gradient(135deg, var(--primary-dark), var(--primary-light));
      color: white; padding: 28px 32px; border-radius: var(--radius); margin-bottom: 24px;
    }
    .welcome-banner h1 { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
    .welcome-banner p { opacity: 0.85; font-size: 14px; }
    .welcome-actions { display: flex; gap: 10px; }
    .btn-white { background: white; color: var(--primary); padding: 10px 20px; border-radius: var(--radius-sm); font-weight: 600; font-size: 14px; }
    .btn-outline { background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.5); padding: 10px 20px; border-radius: var(--radius-sm); font-weight: 600; font-size: 14px; }

    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 20px; display: flex; align-items: center; gap: 14px;
    }
    .stat-icon { font-size: 32px; }
    .stat-value { font-size: 20px; font-weight: 700; display: block; }
    .stat-label { font-size: 12px; color: var(--text-secondary); }

    .xp-bar-card { margin-bottom: 24px; }
    .xp-header { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 8px; }
    .xp-bar { height: 12px; background: var(--border); border-radius: 6px; overflow: hidden; }
    .xp-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 6px; transition: width 0.5s; }
    .xp-text { font-size: 12px; color: var(--text-secondary); margin-top: 6px; }

    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    .card { background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border); padding: 24px; box-shadow: var(--shadow); }
    .card h3 { font-size: 16px; margin-bottom: 16px; }

    .quick-actions { display: flex; flex-direction: column; gap: 8px; }
    .action-card {
      display: flex; align-items: center; gap: 14px;
      padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border);
      cursor: pointer; transition: all 0.15s;
    }
    .action-card:hover { border-color: var(--primary-light); background: rgba(26,86,219,0.03); transform: translateX(4px); }
    .action-icon { font-size: 28px; }
    .action-card strong { display: block; font-size: 14px; margin-bottom: 2px; }
    .action-card p { font-size: 12px; color: var(--text-secondary); margin: 0; }
    .action-card > .material-icons:last-child { margin-left: auto; color: var(--text-light); }

    .tips-list { display: flex; flex-direction: column; gap: 12px; }
    .tip-item { display: flex; gap: 12px; align-items: flex-start; }
    .tip-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
    .tip-item strong { display: block; font-size: 13px; margin-bottom: 2px; }
    .tip-item p { font-size: 12px; color: var(--text-secondary); margin: 0; line-height: 1.5; }

    .chart-card { margin-bottom: 24px; }

    .list-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 0; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.15s;
    }
    .list-item:last-child { border-bottom: none; }
    .list-item:hover { background: rgba(26,86,219,0.03); margin: 0 -24px; padding: 12px 24px; }
    .list-left { display: flex; align-items: center; gap: 12px; }
    .list-date { font-size: 13px; color: var(--text-secondary); }
    .list-right { display: flex; align-items: center; gap: 8px; }
    .band-score { font-weight: 700; font-size: 18px; color: var(--primary); }

    .badges-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .badge-item {
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 16px 8px; border-radius: var(--radius-sm);
      border: 1px solid var(--border); transition: all 0.2s;
    }
    .badge-item.earned { background: #fffbeb; border-color: var(--accent); }
    .badge-item.locked { opacity: 0.4; }
    .badge-icon { font-size: 28px; margin-bottom: 6px; }
    .badge-item.earned .badge-icon { color: var(--accent); }
    .badge-name { font-weight: 600; font-size: 13px; margin-bottom: 2px; }
    .badge-desc { font-size: 11px; color: var(--text-secondary); }

    .empty-state { text-align: center; padding: 32px 0; color: var(--text-secondary); }
    .empty-state .material-icons { font-size: 40px; margin-bottom: 8px; opacity: 0.3; display: block; }
    .empty-state a { margin-top: 12px; }
    .btn-sm { padding: 8px 16px; font-size: 13px; }

    .loading { text-align: center; padding: 80px 0; color: var(--text-secondary); }
    .spin { animation: spin 1s linear infinite; font-size: 32px; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .error-state { text-align: center; padding: 60px 0; color: var(--text-secondary); }
    .error-state .material-icons { font-size: 40px; color: var(--danger); margin-bottom: 8px; display: block; }
  `],
})
export class DashboardComponent implements OnInit {
  @ViewChild('bandChart') chartRef!: ElementRef<HTMLCanvasElement>;
  data: any = null;
  loading = true;
  error = '';
  private chart: Chart | null = null;

  tips = [
    { icon: '📝', title: 'Task 2 structure', text: 'Use a 4-paragraph structure: introduction, body 1, body 2, conclusion.' },
    { icon: '⏱️', title: 'Time management', text: 'Spend 20 min on Task 1 and 40 min on Task 2. Task 2 carries more weight.' },
    { icon: '📖', title: 'Reading strategy', text: 'Skim the passage first, then read questions. Look for keywords to locate answers.' },
    { icon: '🎯', title: 'Band 7+ tip', text: 'Use a mix of simple and complex sentences. Examiners look for variety.' },
    { icon: '🔄', title: 'Be consistent', text: 'Even 20 minutes daily beats 3-hour sessions once a week. Build a streak!' },
  ];

  constructor(private api: ApiService, public auth: AuthService) {}

  ngOnInit() { this.loadDashboard(); }

  getDisplayName(): string {
    const user = this.auth.user();
    return user?.full_name || user?.username || 'Student';
  }

  getUserBand(): string {
    return String(this.auth.user()?.target_band || 7.0);
  }

  getEarnedCount(): number {
    return this.data?.badges?.filter((b: any) => b.earned).length || 0;
  }

  loadDashboard() {
    this.loading = true;
    this.error = '';
    this.api.getDashboard().subscribe({
      next: (d) => { this.data = d; this.loading = false; setTimeout(() => this.renderChart(), 200); },
      error: (err) => {
        this.loading = false;
        this.error = err.status === 401
          ? 'Session expired. Please log out and log in again.'
          : 'Could not load dashboard data. Try clicking Retry.';
      },
    });
  }

  getXpPercent(): number {
    if (!this.data?.progress) return 0;
    const p = this.data.progress;
    const total = p.xp_to_next_level + (p.xp % ((p.level + 1) * 100) || p.xp);
    return total > 0 ? ((total - p.xp_to_next_level) / total) * 100 : 0;
  }

  getBadgeIcon(icon: string): string {
    const map: Record<string, string> = {
      edit: 'edit', feather: 'draw', award: 'workspace_premium',
      flame: 'local_fire_department', zap: 'bolt', star: 'star',
      trophy: 'emoji_events', book: 'menu_book', shield: 'shield', target: 'gps_fixed',
    };
    return map[icon] || 'star';
  }

  renderChart() {
    if (!this.data?.writing_band_history?.length || !this.chartRef) return;
    const h = this.data.writing_band_history;
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: h.map((x: any) => new Date(x.date).toLocaleDateString()),
        datasets: [{
          label: 'Band Score', data: h.map((x: any) => x.band),
          borderColor: '#1a56db', backgroundColor: 'rgba(26,86,219,0.1)',
          fill: true, tension: 0.3, pointRadius: 5, pointBackgroundColor: '#1a56db',
        }],
      },
      options: {
        responsive: true,
        scales: { y: { min: 0, max: 9, ticks: { stepSize: 1 } } },
        plugins: { legend: { display: false } },
      },
    });
  }
}