import {
  AuthService
} from "./chunk-ZI7PRZQA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-4KX64OC2.js";
import {
  CommonModule,
  NgIf,
  Router,
  RouterLink,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-CLVG2C7R.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var LoginComponent = class _LoginComponent {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
    this.email = "";
    this.password = "";
    this.error = "";
    this.loading = false;
    if (auth.isLoggedIn())
      this.router.navigate(["/dashboard"]);
  }
  onLogin() {
    if (!this.email || !this.password) {
      this.error = "Please fill in all fields";
      return;
    }
    this.loading = true;
    this.error = "";
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(["/dashboard"]),
      error: (err) => {
        this.error = err.error?.detail || "Login failed";
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 5, consts: [[1, "auth-page"], [1, "auth-card"], [1, "auth-header"], [1, "auth-logo"], ["class", "error-msg", 4, "ngIf"], [1, "form-group"], ["type", "email", "placeholder", "your@email.com", 3, "ngModelChange", "keyup.enter", "ngModel"], ["type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-primary", "full-width", 3, "click", "disabled"], [1, "auth-footer"], ["routerLink", "/register"], [1, "error-msg"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "\u{1F4DD}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "Welcome Back");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p");
        \u0275\u0275text(8, "Sign in to your IELTS Prep account");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, LoginComponent_div_9_Template, 2, 1, "div", 4);
        \u0275\u0275elementStart(10, "div", 5)(11, "label");
        \u0275\u0275text(12, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275listener("keyup.enter", function LoginComponent_Template_input_keyup_enter_13_listener() {
          return ctx.onLogin();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 5)(15, "label");
        \u0275\u0275text(16, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275listener("keyup.enter", function LoginComponent_Template_input_keyup_enter_17_listener() {
          return ctx.onLogin();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "button", 8);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_18_listener() {
          return ctx.onLogin();
        });
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "p", 9);
        \u0275\u0275text(21, " Don't have an account? ");
        \u0275\u0275elementStart(22, "a", 10);
        \u0275\u0275text(23, "Create one");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Signing in..." : "Sign In", " ");
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ["\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #0f172a 0%,\n      #1e3a5f 50%,\n      #1a56db 100%);\n  padding: 20px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 40px;\n  width: 100%;\n  max-width: 420px;\n  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.auth-logo[_ngcontent-%COMP%] {\n  font-size: 48px;\n  display: block;\n  margin-bottom: 12px;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 800;\n  margin-bottom: 6px;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 14px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px;\n  font-size: 15px;\n}\n.error-msg[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  padding: 12px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 16px;\n  text-align: center;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 20px;\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login\\login.component.ts", lineNumber: 95 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-BHD67GFL.js.map
