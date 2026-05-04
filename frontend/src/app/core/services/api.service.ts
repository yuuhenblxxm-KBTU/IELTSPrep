import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    return this.http.get('/api/dashboard/');
  }

  getWritingHistory(): Observable<any[]> {
    return this.http.get<any[]>('/api/writing/history');
  }

  submitWriting(data: { task_type: string; prompt?: string; essay: string }): Observable<any> {
    return this.http.post('/api/writing/submit', data);
  }

  getSubmission(id: number): Observable<any> {
    return this.http.get(`/api/writing/${id}`);
  }

  getExams(): Observable<any[]> {
    return this.http.get<any[]>('/api/exams/');
  }

  getExam(id: number): Observable<any> {
    return this.http.get(`/api/exams/${id}`);
  }

  submitExam(data: { exam_id: number; answers: { question_id: number; answer: string }[]; time_spent: number }): Observable<any> {
    return this.http.post('/api/exams/submit', data);
  }

  getExamHistory(): Observable<any[]> {
    return this.http.get<any[]>('/api/exams/results/history');
  }

  getProfile(): Observable<any> {
    return this.http.get('/api/users/me');
  }

  updateProfile(data: { full_name?: string; username?: string; target_band?: number }): Observable<any> {
    return this.http.put('/api/users/me', data);
  }

  changePassword(data: { current_password: string; new_password: string }): Observable<any> {
    return this.http.post('/api/users/me/password', data);
  }
}
