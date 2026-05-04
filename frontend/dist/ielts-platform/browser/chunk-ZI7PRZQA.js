import {
  HttpClient,
  Router,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-CLVG2C7R.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.tokenKey = "ielts_token";
    this.userKey = "ielts_user";
    this.user = signal(this.loadUser());
  }
  loadUser() {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  isLoggedIn() {
    return !!this.getToken();
  }
  register(data) {
    return this.http.post("/api/auth/register", data).pipe(tap((res) => this.handleAuth(res)));
  }
  login(data) {
    return this.http.post("/api/auth/login", data).pipe(tap((res) => this.handleAuth(res)));
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user.set(null);
    this.router.navigate(["/login"]);
  }
  updateUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.user.set(user);
  }
  handleAuth(res) {
    localStorage.setItem(this.tokenKey, res.access_token);
    localStorage.setItem(this.userKey, JSON.stringify(res.user));
    this.user.set(res.user);
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-ZI7PRZQA.js.map
