import {
  AuthService
} from "./chunk-ZI7PRZQA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
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

// src/app/features/auth/register/register.component.ts
function RegisterComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
    this.fullName = "";
    this.username = "";
    this.email = "";
    this.password = "";
    this.targetBand = 7;
    this.error = "";
    this.loading = false;
  }
  onRegister() {
    if (!this.username || !this.email || !this.password) {
      this.error = "Please fill in all required fields";
      return;
    }
    if (this.password.length < 6) {
      this.error = "Password must be at least 6 characters";
      return;
    }
    this.loading = true;
    this.error = "";
    this.auth.register({
      email: this.email,
      username: this.username,
      password: this.password,
      full_name: this.fullName || void 0,
      target_band: +this.targetBand
    }).subscribe({
      next: () => this.router.navigate(["/dashboard"]),
      error: (err) => {
        this.error = err.error?.detail || "Registration failed";
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 54, vars: 17, consts: [[1, "auth-page"], [1, "auth-card"], [1, "auth-header"], [1, "auth-logo"], ["class", "error-msg", 4, "ngIf"], [1, "form-group"], ["type", "text", "placeholder", "John Doe", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "johndoe", 3, "ngModelChange", "ngModel"], ["type", "email", "placeholder", "your@email.com", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "At least 6 characters", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], [3, "value"], ["selected", "", 3, "value"], [1, "btn", "btn-primary", "full-width", 3, "click", "disabled"], [1, "auth-footer"], ["routerLink", "/login"], [1, "error-msg"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "\u{1F4DD}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "Create Account");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p");
        \u0275\u0275text(8, "Start your IELTS preparation journey");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, RegisterComponent_div_9_Template, 2, 1, "div", 4);
        \u0275\u0275elementStart(10, "div", 5)(11, "label");
        \u0275\u0275text(12, "Full Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.fullName, $event) || (ctx.fullName = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 5)(15, "label");
        \u0275\u0275text(16, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 5)(19, "label");
        \u0275\u0275text(20, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 5)(23, "label");
        \u0275\u0275text(24, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_25_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 5)(27, "label");
        \u0275\u0275text(28, "Target IELTS Band");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "select", 10);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_select_ngModelChange_29_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.targetBand, $event) || (ctx.targetBand = $event);
          return $event;
        });
        \u0275\u0275elementStart(30, "option", 11);
        \u0275\u0275text(31, "5.0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "option", 11);
        \u0275\u0275text(33, "5.5");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "option", 11);
        \u0275\u0275text(35, "6.0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "option", 11);
        \u0275\u0275text(37, "6.5");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "option", 12);
        \u0275\u0275text(39, "7.0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "option", 11);
        \u0275\u0275text(41, "7.5");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "option", 11);
        \u0275\u0275text(43, "8.0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "option", 11);
        \u0275\u0275text(45, "8.5");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "option", 11);
        \u0275\u0275text(47, "9.0");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(48, "button", 13);
        \u0275\u0275listener("click", function RegisterComponent_Template_button_click_48_listener() {
          return ctx.onRegister();
        });
        \u0275\u0275text(49);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "p", 14);
        \u0275\u0275text(51, " Already have an account? ");
        \u0275\u0275elementStart(52, "a", 15);
        \u0275\u0275text(53, "Sign in");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.fullName);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.username);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.targetBand);
        \u0275\u0275advance();
        \u0275\u0275property("value", 5);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", 5.5);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", 6);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", 6.5);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", 7);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", 7.5);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", 8);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", 8.5);
        \u0275\u0275advance(2);
        \u0275\u0275property("value", 9);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Creating..." : "Create Account", " ");
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ["\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #0f172a 0%,\n      #1e3a5f 50%,\n      #1a56db 100%);\n  padding: 20px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 40px;\n  width: 100%;\n  max-width: 420px;\n  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 28px;\n}\n.auth-logo[_ngcontent-%COMP%] {\n  font-size: 48px;\n  display: block;\n  margin-bottom: 12px;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 800;\n  margin-bottom: 6px;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 14px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px;\n  font-size: 15px;\n}\n.error-msg[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  padding: 12px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 16px;\n  text-align: center;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 20px;\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=register.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\features\\auth\\register\\register.component.ts", lineNumber: 102 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-5RDU3E25.js.map
