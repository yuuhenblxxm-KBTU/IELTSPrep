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
  ApiService
} from "./chunk-S47TPVAJ.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-CLVG2C7R.js";

// src/app/features/profile/profile.component.ts
function ProfileComponent_option_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r1 = ctx.$implicit;
    \u0275\u0275property("value", b_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r1);
  }
}
function ProfileComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.profileSuccess);
  }
}
function ProfileComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.profileError);
  }
}
function ProfileComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.pwSuccess);
  }
}
function ProfileComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.pwError);
  }
}
var ProfileComponent = class _ProfileComponent {
  constructor(api, auth) {
    this.api = api;
    this.auth = auth;
    this.user = null;
    this.form = { full_name: "", username: "", target_band: 7 };
    this.pwForm = { current_password: "", new_password: "", confirm: "" };
    this.savingProfile = false;
    this.savingPw = false;
    this.profileSuccess = "";
    this.profileError = "";
    this.pwSuccess = "";
    this.pwError = "";
    this.bandOptions = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
  }
  ngOnInit() {
    this.api.getProfile().subscribe({
      next: (u) => {
        this.user = u;
        this.form.full_name = u.full_name || "";
        this.form.username = u.username || "";
        this.form.target_band = u.target_band || 7;
      }
    });
  }
  onSaveProfile() {
    this.profileSuccess = "";
    this.profileError = "";
    this.savingProfile = true;
    this.api.updateProfile({
      full_name: this.form.full_name || void 0,
      username: this.form.username || void 0,
      target_band: this.form.target_band
    }).subscribe({
      next: (updated) => {
        this.user = updated;
        this.auth.updateUser(updated);
        this.profileSuccess = "Profile updated successfully!";
        this.savingProfile = false;
      },
      error: (err) => {
        this.profileError = err.error?.detail || "Failed to update profile";
        this.savingProfile = false;
      }
    });
  }
  onChangePassword() {
    this.pwSuccess = "";
    this.pwError = "";
    if (!this.pwForm.current_password || !this.pwForm.new_password) {
      this.pwError = "Please fill in all password fields";
      return;
    }
    if (this.pwForm.new_password !== this.pwForm.confirm) {
      this.pwError = "New passwords do not match";
      return;
    }
    if (this.pwForm.new_password.length < 8) {
      this.pwError = "New password must be at least 8 characters";
      return;
    }
    this.savingPw = true;
    this.api.changePassword({
      current_password: this.pwForm.current_password,
      new_password: this.pwForm.new_password
    }).subscribe({
      next: () => {
        this.pwSuccess = "Password updated successfully!";
        this.pwForm = { current_password: "", new_password: "", confirm: "" };
        this.savingPw = false;
      },
      error: (err) => {
        this.pwError = err.error?.detail || "Failed to change password";
        this.savingPw = false;
      }
    });
  }
  static {
    this.\u0275fac = function ProfileComponent_Factory(t) {
      return new (t || _ProfileComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 58, vars: 20, consts: [[1, "profile-page"], [1, "subtitle"], [1, "card"], [1, "form-group"], ["type", "text", "placeholder", "Your full name", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Username", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "success-msg", 4, "ngIf"], ["class", "error-msg", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["type", "password", "placeholder", "Current password", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "New password (min 8 chars)", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "Confirm new password", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-secondary", 3, "click", "disabled"], [1, "card", "info-card"], [1, "info-row"], [1, "info-label"], [1, "info-value"], [3, "value"], [1, "success-msg"], [1, "error-msg"]], template: function ProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Profile Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p", 1);
        \u0275\u0275text(4, "Manage your account and preferences");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 2)(6, "h3");
        \u0275\u0275text(7, "Personal Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 3)(9, "label");
        \u0275\u0275text(10, "Full Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.full_name, $event) || (ctx.form.full_name = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 3)(13, "label");
        \u0275\u0275text(14, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "input", 5);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.username, $event) || (ctx.form.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 3)(17, "label");
        \u0275\u0275text(18, "Target Band Score");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "select", 6);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_select_ngModelChange_19_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.target_band, $event) || (ctx.form.target_band = $event);
          return $event;
        });
        \u0275\u0275template(20, ProfileComponent_option_20_Template, 2, 2, "option", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(21, ProfileComponent_div_21_Template, 2, 1, "div", 8)(22, ProfileComponent_div_22_Template, 2, 1, "div", 9);
        \u0275\u0275elementStart(23, "button", 10);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_23_listener() {
          return ctx.onSaveProfile();
        });
        \u0275\u0275text(24);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 2)(26, "h3");
        \u0275\u0275text(27, "Change Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 3)(29, "label");
        \u0275\u0275text(30, "Current Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_31_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pwForm.current_password, $event) || (ctx.pwForm.current_password = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 3)(33, "label");
        \u0275\u0275text(34, "New Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_35_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pwForm.new_password, $event) || (ctx.pwForm.new_password = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "div", 3)(37, "label");
        \u0275\u0275text(38, "Confirm New Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "input", 13);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_39_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pwForm.confirm, $event) || (ctx.pwForm.confirm = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(40, ProfileComponent_div_40_Template, 2, 1, "div", 8)(41, ProfileComponent_div_41_Template, 2, 1, "div", 9);
        \u0275\u0275elementStart(42, "button", 14);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_42_listener() {
          return ctx.onChangePassword();
        });
        \u0275\u0275text(43);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 15)(45, "h3");
        \u0275\u0275text(46, "Account Info");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "div", 16)(48, "span", 17);
        \u0275\u0275text(49, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "span", 18);
        \u0275\u0275text(51);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 16)(53, "span", 17);
        \u0275\u0275text(54, "Member since");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "span", 18);
        \u0275\u0275text(56);
        \u0275\u0275pipe(57, "date");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.full_name);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.username);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.target_band);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.bandOptions);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.profileSuccess);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.profileError);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.savingProfile);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.savingProfile ? "Saving..." : "Save Changes", " ");
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.pwForm.current_password);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.pwForm.new_password);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.pwForm.confirm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.pwSuccess);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.pwError);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.savingPw);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.savingPw ? "Updating..." : "Update Password", " ");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.user == null ? null : ctx.user.email);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(57, 17, ctx.user == null ? null : ctx.user.created_at, "mediumDate"));
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.profile-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  margin-bottom: 4px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 24px;\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  padding: 24px;\n  box-shadow: var(--shadow);\n  margin-bottom: 24px;\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  margin-bottom: 20px;\n}\n.success-msg[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #065f46;\n  padding: 10px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 14px;\n}\n.error-msg[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  padding: 10px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 14px;\n}\n.info-card[_ngcontent-%COMP%] {\n}\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border);\n}\n.info-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.info-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n}\n/*# sourceMappingURL=profile.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src\\app\\features\\profile\\profile.component.ts", lineNumber: 102 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-NYEDLVB3.js.map
