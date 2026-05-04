import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar">
      <div class="navbar-left">
        <h2 class="page-title">IELTS Preparation Platform</h2>
      </div>
      <div class="navbar-right">
        <div class="user-info" *ngIf="auth.user() as user">
          <div class="avatar">{{ getInitials(user.username) }}</div>
          <span class="username">{{ user.username }}</span>
        </div>
        <button class="btn-logout" (click)="auth.logout()">
          <span class="material-icons">logout</span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 32px;
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
    }
    .page-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text);
    }
    .navbar-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 13px;
    }
    .username {
      font-weight: 600;
      font-size: 14px;
      color: var(--text);
    }
    .btn-logout {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-secondary);
      padding: 8px;
      border-radius: var(--radius-sm);
      transition: all 0.2s;
    }
    .btn-logout:hover {
      color: var(--danger);
      background: rgba(239,68,68,0.08);
    }
  `],
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}

  getInitials(name: string): string {
    return name.slice(0, 2).toUpperCase();
  }
}
