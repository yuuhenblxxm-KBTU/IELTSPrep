import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-icon">📝</span>
        <span class="logo-text">IELTS Prep</span>
      </div>

      <nav class="nav-links">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="material-icons">dashboard</span>
          <span>Dashboard</span>
        </a>
        <a routerLink="/writing" routerLinkActive="active" class="nav-item">
          <span class="material-icons">edit_note</span>
          <span>Writing</span>
        </a>
        <a routerLink="/exams" routerLinkActive="active" class="nav-item">
          <span class="material-icons">quiz</span>
          <span>Mock Exams</span>
        </a>
        <a routerLink="/profile" routerLinkActive="active" class="nav-item">
          <span class="material-icons">person</span>
          <span>Profile</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <div class="version">v1.0 MVP</div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      min-width: 240px;
      height: 100vh;
      background: var(--bg-dark);
      color: white;
      display: flex;
      flex-direction: column;
      padding: 24px 16px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 12px 28px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 24px;
    }
    .logo-icon { font-size: 28px; }
    .logo-text {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      color: rgba(255,255,255,0.6);
      font-weight: 500;
      font-size: 14px;
      transition: all 0.2s;
    }
    .nav-item:hover {
      color: white;
      background: rgba(255,255,255,0.08);
    }
    .nav-item.active {
      color: white;
      background: var(--primary);
    }
    .nav-item .material-icons { font-size: 20px; }
    .sidebar-footer {
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .version {
      text-align: center;
      font-size: 11px;
      color: rgba(255,255,255,0.3);
    }
  `],
})
export class SidebarComponent {}
