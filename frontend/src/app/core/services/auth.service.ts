import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export interface UserData {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  target_band: number;
  avatar_url: string | null;
  created_at: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserData;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'ielts_token';
  private userKey = 'ielts_user';
  
  user = signal<UserData | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  private loadUser(): UserData | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  register(data: { email: string; username: string; password: string; full_name?: string; target_band?: number }) {
    return this.http.post<AuthResponse>('/api/auth/register', data).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthResponse>('/api/auth/login', data).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  updateUser(user: UserData) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.user.set(user);
  }

  private handleAuth(res: AuthResponse) {
    localStorage.setItem(this.tokenKey, res.access_token);
    localStorage.setItem(this.userKey, JSON.stringify(res.user));
    this.user.set(res.user);
  }
}
