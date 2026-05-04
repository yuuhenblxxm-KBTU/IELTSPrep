import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-CLVG2C7R.js";

// src/app/core/services/api.service.ts
var ApiService = class _ApiService {
  constructor(http) {
    this.http = http;
  }
  getDashboard() {
    return this.http.get("/api/dashboard/");
  }
  getWritingHistory() {
    return this.http.get("/api/writing/history");
  }
  submitWriting(data) {
    return this.http.post("/api/writing/submit", data);
  }
  getSubmission(id) {
    return this.http.get(`/api/writing/${id}`);
  }
  getExams() {
    return this.http.get("/api/exams/");
  }
  getExam(id) {
    return this.http.get(`/api/exams/${id}`);
  }
  submitExam(data) {
    return this.http.post("/api/exams/submit", data);
  }
  getExamHistory() {
    return this.http.get("/api/exams/results/history");
  }
  getProfile() {
    return this.http.get("/api/users/me");
  }
  updateProfile(data) {
    return this.http.put("/api/users/me", data);
  }
  changePassword(data) {
    return this.http.post("/api/users/me/password", data);
  }
  static {
    this.\u0275fac = function ApiService_Factory(t) {
      return new (t || _ApiService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
  }
};

export {
  ApiService
};
//# sourceMappingURL=chunk-S47TPVAJ.js.map
