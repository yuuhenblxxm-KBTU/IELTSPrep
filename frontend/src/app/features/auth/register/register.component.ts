import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <span class="auth-logo">📝</span>
          <h1>Create Account</h1>
          <p>Start your IELTS preparation journey</p>
        </div>

        <div class="error-msg" *ngIf="error">{{ error }}</div>

        <div class="form-group">
          <label>Full Name</label>
          <input type="text" [(ngModel)]="fullName" placeholder="John Doe">
        </div>

        <div class="form-group">
          <label>Username</label>
          <input type="text" [(ngModel)]="username" placeholder="johndoe">
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" placeholder="your@email.com">
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" placeholder="At least 6 characters">
        </div>

        <div class="form-group">
          <label>Target IELTS Band</label>
          <select [(ngModel)]="targetBand">
            <option [value]="5.0">5.0</option>
            <option [value]="5.5">5.5</option>
            <option [value]="6.0">6.0</option>
            <option [value]="6.5">6.5</option>
            <option [value]="7.0" selected>7.0</option>
            <option [value]="7.5">7.5</option>
            <option [value]="8.0">8.0</option>
            <option [value]="8.5">8.5</option>
            <option [value]="9.0">9.0</option>
          </select>
        </div>

        <button class="btn btn-primary full-width" (click)="onRegister()" [disabled]="loading">
          {{ loading ? 'Creating...' : 'Create Account' }}
        </button>

        <p class="auth-footer">
          Already have an account? <a routerLink="/login">Sign in</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1a56db 100%);
      padding: 20px;
    }
    .auth-card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.3);
    }
    .auth-header {
      text-align: center;
      margin-bottom: 28px;
    }
    .auth-logo { font-size: 48px; display: block; margin-bottom: 12px; }
    .auth-header h1 { font-size: 26px; font-weight: 800; margin-bottom: 6px; }
    .auth-header p { color: var(--text-secondary); font-size: 14px; }
    .full-width { width: 100%; padding: 14px; font-size: 15px; }
    .error-msg {
      background: #fef2f2; color: #dc2626; padding: 12px;
      border-radius: 8px; font-size: 13px; margin-bottom: 16px; text-align: center;
    }
    .auth-footer {
      text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-secondary);
    }
    .auth-footer a { color: var(--primary); font-weight: 600; }
  `],
})
export class RegisterComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';
  targetBand = 7.0;
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    if (!this.username || !this.email || !this.password) {
      this.error = 'Please fill in all required fields';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }
    this.loading = true;
    this.error = '';
    this.auth.register({
      email: this.email,
      username: this.username,
      password: this.password,
      full_name: this.fullName || undefined,
      target_band: +this.targetBand,
    }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err.error?.detail || 'Registration failed';
        this.loading = false;
      },
    });
  }
}
