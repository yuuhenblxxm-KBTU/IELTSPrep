import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-page">
      <h1>Profile Settings</h1>
      <p class="subtitle">Manage your account and preferences</p>

      <!-- Profile Form -->
      <div class="card">
        <h3>Personal Information</h3>

        <div class="form-group">
          <label>Full Name</label>
          <input type="text" [(ngModel)]="form.full_name" placeholder="Your full name">
        </div>

        <div class="form-group">
          <label>Username</label>
          <input type="text" [(ngModel)]="form.username" placeholder="Username">
        </div>

        <div class="form-group">
          <label>Target Band Score</label>
          <select [(ngModel)]="form.target_band">
            <option *ngFor="let b of bandOptions" [value]="b">{{ b }}</option>
          </select>
        </div>

        <div class="success-msg" *ngIf="profileSuccess">{{ profileSuccess }}</div>
        <div class="error-msg" *ngIf="profileError">{{ profileError }}</div>

        <button class="btn btn-primary" (click)="onSaveProfile()" [disabled]="savingProfile">
          {{ savingProfile ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>

      <!-- Change Password -->
      <div class="card">
        <h3>Change Password</h3>

        <div class="form-group">
          <label>Current Password</label>
          <input type="password" [(ngModel)]="pwForm.current_password" placeholder="Current password">
        </div>

        <div class="form-group">
          <label>New Password</label>
          <input type="password" [(ngModel)]="pwForm.new_password" placeholder="New password (min 8 chars)">
        </div>

        <div class="form-group">
          <label>Confirm New Password</label>
          <input type="password" [(ngModel)]="pwForm.confirm" placeholder="Confirm new password">
        </div>

        <div class="success-msg" *ngIf="pwSuccess">{{ pwSuccess }}</div>
        <div class="error-msg" *ngIf="pwError">{{ pwError }}</div>

        <button class="btn btn-secondary" (click)="onChangePassword()" [disabled]="savingPw">
          {{ savingPw ? 'Updating...' : 'Update Password' }}
        </button>
      </div>

      <!-- Account Info -->
      <div class="card info-card">
        <h3>Account Info</h3>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">{{ user?.email }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Member since</span>
          <span class="info-value">{{ user?.created_at | date:'mediumDate' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page h1 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
    .subtitle { color: var(--text-secondary); margin-bottom: 24px; }
    .card { background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border); padding: 24px; box-shadow: var(--shadow); margin-bottom: 24px; }
    .card h3 { font-size: 16px; font-weight: 700; margin-bottom: 20px; }

    .success-msg { background: #ecfdf5; color: #065f46; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 14px; }
    .error-msg { background: #fef2f2; color: #dc2626; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 14px; }

    .info-card { }
    .info-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border); }
    .info-row:last-child { border-bottom: none; }
    .info-label { font-size: 13px; color: var(--text-secondary); }
    .info-value { font-size: 14px; font-weight: 600; }
  `],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  form = { full_name: '', username: '', target_band: 7.0 };
  pwForm = { current_password: '', new_password: '', confirm: '' };
  savingProfile = false;
  savingPw = false;
  profileSuccess = '';
  profileError = '';
  pwSuccess = '';
  pwError = '';

  bandOptions = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.api.getProfile().subscribe({
      next: (u) => {
        this.user = u;
        this.form.full_name = u.full_name || '';
        this.form.username = u.username || '';
        this.form.target_band = u.target_band || 7.0;
      },
    });
  }

  onSaveProfile() {
    this.profileSuccess = '';
    this.profileError = '';
    this.savingProfile = true;
    this.api.updateProfile({
      full_name: this.form.full_name || undefined,
      username: this.form.username || undefined,
      target_band: this.form.target_band,
    }).subscribe({
      next: (updated) => {
        this.user = updated;
        this.auth.updateUser(updated);
        this.profileSuccess = 'Profile updated successfully!';
        this.savingProfile = false;
      },
      error: (err) => {
        this.profileError = err.error?.detail || 'Failed to update profile';
        this.savingProfile = false;
      },
    });
  }

  onChangePassword() {
    this.pwSuccess = '';
    this.pwError = '';

    if (!this.pwForm.current_password || !this.pwForm.new_password) {
      this.pwError = 'Please fill in all password fields';
      return;
    }
    if (this.pwForm.new_password !== this.pwForm.confirm) {
      this.pwError = 'New passwords do not match';
      return;
    }
    if (this.pwForm.new_password.length < 8) {
      this.pwError = 'New password must be at least 8 characters';
      return;
    }

    this.savingPw = true;
    this.api.changePassword({
      current_password: this.pwForm.current_password,
      new_password: this.pwForm.new_password,
    }).subscribe({
      next: () => {
        this.pwSuccess = 'Password updated successfully!';
        this.pwForm = { current_password: '', new_password: '', confirm: '' };
        this.savingPw = false;
      },
      error: (err) => {
        this.pwError = err.error?.detail || 'Failed to change password';
        this.savingPw = false;
      },
    });
  }
}
