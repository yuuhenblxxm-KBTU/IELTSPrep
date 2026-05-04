import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="app-shell" *ngIf="auth.isLoggedIn(); else authPages">
      <app-sidebar></app-sidebar>
      <div class="main-area">
        <app-navbar></app-navbar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
    <ng-template #authPages>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .app-shell {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 28px 32px;
      background: var(--bg);
    }
  `],
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
