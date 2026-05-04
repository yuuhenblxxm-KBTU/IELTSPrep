import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'writing',
    loadComponent: () =>
      import('./features/writing/writing.component').then(m => m.WritingComponent),
    canActivate: [authGuard],
  },
  {
    path: 'writing/:id',
    loadComponent: () =>
      import('./features/writing/submission-detail/submission-detail.component').then(m => m.SubmissionDetailComponent),
    canActivate: [authGuard],
  },
  {
    path: 'exams',
    loadComponent: () =>
      import('./features/exams/exam-list/exam-list.component').then(m => m.ExamListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'exams/:id',
    loadComponent: () =>
      import('./features/exams/exam-take/exam-take.component').then(m => m.ExamTakeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
