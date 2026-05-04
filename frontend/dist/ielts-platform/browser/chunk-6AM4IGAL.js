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
  RouterLink,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-CLVG2C7R.js";

// src/app/features/writing/writing.component.ts
var _c0 = (a0) => ["/writing", a0];
function WritingComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function WritingComponent_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1, "send");
    \u0275\u0275elementEnd();
  }
}
function WritingComponent_div_31_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "h4");
    \u0275\u0275text(2, "Detailed Feedback");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.latestResult.feedback.feedback_text);
  }
}
function WritingComponent_div_31_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "h4");
    \u0275\u0275text(2, "Strengths");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.latestResult.feedback.strengths);
  }
}
function WritingComponent_div_31_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "h4");
    \u0275\u0275text(2, "Suggestions for Improvement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.latestResult.feedback.suggestions);
  }
}
function WritingComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "h3");
    \u0275\u0275text(2, "Latest Feedback");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 23)(4, "div", 24)(5, "span", 25);
    \u0275\u0275text(6, "Overall");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 27)(10, "span", 25);
    \u0275\u0275text(11, "Task Achievement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 26);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 27)(15, "span", 25);
    \u0275\u0275text(16, "Coherence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 26);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 27)(20, "span", 25);
    \u0275\u0275text(21, "Lexical Resource");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 26);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 27)(25, "span", 25);
    \u0275\u0275text(26, "Grammar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 26);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(29, WritingComponent_div_31_div_29_Template, 5, 1, "div", 28)(30, WritingComponent_div_31_div_30_Template, 5, 1, "div", 28)(31, WritingComponent_div_31_div_31_Template, 5, 1, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.latestResult.feedback == null ? null : ctx_r0.latestResult.feedback.overall_band);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.latestResult.feedback == null ? null : ctx_r0.latestResult.feedback.task_achievement);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.latestResult.feedback == null ? null : ctx_r0.latestResult.feedback.coherence_cohesion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.latestResult.feedback == null ? null : ctx_r0.latestResult.feedback.lexical_resource);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.latestResult.feedback == null ? null : ctx_r0.latestResult.feedback.grammar_accuracy);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.latestResult.feedback == null ? null : ctx_r0.latestResult.feedback.feedback_text);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.latestResult.feedback == null ? null : ctx_r0.latestResult.feedback.strengths);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.latestResult.feedback == null ? null : ctx_r0.latestResult.feedback.suggestions);
  }
}
function WritingComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "p");
    \u0275\u0275text(2, "No submissions yet");
    \u0275\u0275elementEnd()();
  }
}
function WritingComponent_table_36_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 34)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td")(5, "span", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 36);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span", 21);
    \u0275\u0275text(13, "chevron_right");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const w_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, w_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, w_r2.created_at, "mediumDate"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(w_r2.task_type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(w_r2.word_count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((w_r2.feedback == null ? null : w_r2.feedback.overall_band) || "\u2014");
  }
}
function WritingComponent_table_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 32)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Words");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Band");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, WritingComponent_table_36_tr_13_Template, 14, 10, "tr", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r0.history);
  }
}
var WritingComponent = class _WritingComponent {
  constructor(api) {
    this.api = api;
    this.taskType = "task2";
    this.prompt = "";
    this.essay = "";
    this.error = "";
    this.submitting = false;
    this.latestResult = null;
    this.history = [];
    this.loading = true;
  }
  ngOnInit() {
    this.loadHistory();
  }
  getWordCount() {
    return this.essay.trim() ? this.essay.trim().split(/\s+/).length : 0;
  }
  loadHistory() {
    this.api.getWritingHistory().subscribe({
      next: (h) => {
        this.history = h;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  onSubmit() {
    if (this.getWordCount() < 5) {
      this.error = "Please write at least a few sentences";
      return;
    }
    this.error = "";
    this.submitting = true;
    this.api.submitWriting({
      task_type: this.taskType,
      prompt: this.prompt || void 0,
      essay: this.essay
    }).subscribe({
      next: (result) => {
        this.latestResult = result;
        this.submitting = false;
        this.essay = "";
        this.prompt = "";
        this.loadHistory();
      },
      error: (err) => {
        this.error = err.error?.detail || "Submission failed";
        this.submitting = false;
      }
    });
  }
  static {
    this.\u0275fac = function WritingComponent_Factory(t) {
      return new (t || _WritingComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WritingComponent, selectors: [["app-writing"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 37, vars: 11, consts: [[1, "writing-page"], [1, "subtitle"], [1, "card", "submit-card"], [1, "form-row"], [1, "form-group", 2, "flex", "0 0 200px"], [3, "ngModelChange", "ngModel"], ["value", "task1"], ["value", "task2"], [1, "form-group", 2, "flex", "1"], ["type", "text", "placeholder", "e.g. Some people believe that technology...", 3, "ngModelChange", "ngModel"], [1, "form-group"], ["rows", "12", "placeholder", "Write your IELTS essay here...", 3, "ngModelChange", "ngModel"], [1, "word-count"], ["class", "error-msg", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "material-icons", 4, "ngIf"], ["class", "card result-card", 4, "ngIf"], [1, "card"], ["class", "empty-state", 4, "ngIf"], ["class", "history-table", 4, "ngIf"], [1, "error-msg"], [1, "material-icons"], [1, "card", "result-card"], [1, "band-grid"], [1, "band-item", "overall"], [1, "band-label"], [1, "band-value"], [1, "band-item"], ["class", "feedback-section", 4, "ngIf"], [1, "feedback-section"], [1, "suggestions"], [1, "empty-state"], [1, "history-table"], ["class", "clickable", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "clickable", 3, "routerLink"], [1, "badge", "badge-info"], [1, "band-cell"]], template: function WritingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Writing Practice");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p", 1);
        \u0275\u0275text(4, "Submit your IELTS writing task for AI-powered feedback");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 2)(6, "h3");
        \u0275\u0275text(7, "Submit New Essay");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 3)(9, "div", 4)(10, "label");
        \u0275\u0275text(11, "Task Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "select", 5);
        \u0275\u0275twoWayListener("ngModelChange", function WritingComponent_Template_select_ngModelChange_12_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.taskType, $event) || (ctx.taskType = $event);
          return $event;
        });
        \u0275\u0275elementStart(13, "option", 6);
        \u0275\u0275text(14, "Task 1 (Report/Letter)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "option", 7);
        \u0275\u0275text(16, "Task 2 (Essay)");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 8)(18, "label");
        \u0275\u0275text(19, "Prompt / Question (optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function WritingComponent_Template_input_ngModelChange_20_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.prompt, $event) || (ctx.prompt = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "div", 10)(22, "label");
        \u0275\u0275text(23, "Your Essay");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "textarea", 11);
        \u0275\u0275twoWayListener("ngModelChange", function WritingComponent_Template_textarea_ngModelChange_24_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.essay, $event) || (ctx.essay = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "div", 12);
        \u0275\u0275text(26);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(27, WritingComponent_div_27_Template, 2, 1, "div", 13);
        \u0275\u0275elementStart(28, "button", 14);
        \u0275\u0275listener("click", function WritingComponent_Template_button_click_28_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275template(29, WritingComponent_span_29_Template, 2, 0, "span", 15);
        \u0275\u0275text(30);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(31, WritingComponent_div_31_Template, 32, 8, "div", 16);
        \u0275\u0275elementStart(32, "div", 17)(33, "h3");
        \u0275\u0275text(34, "Writing History");
        \u0275\u0275elementEnd();
        \u0275\u0275template(35, WritingComponent_div_35_Template, 3, 0, "div", 18)(36, WritingComponent_table_36_Template, 14, 1, "table", 19);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.taskType);
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.prompt);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.essay);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("", ctx.getWordCount(), " words");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.submitting ? "Getting AI Feedback..." : "Submit for Feedback", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.latestResult);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.history.length === 0 && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.history.length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ["\n\n.writing-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  margin-bottom: 4px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 24px;\n}\n.submit-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.submit-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.word-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  text-align: right;\n  margin-top: 4px;\n}\n.error-msg[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  padding: 10px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 12px;\n}\n.result-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.result-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.band-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.band-item[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 16px;\n  border-radius: var(--radius-sm);\n  background: var(--bg);\n  border: 1px solid var(--border);\n}\n.band-item.overall[_ngcontent-%COMP%] {\n  background: var(--primary);\n  border: none;\n}\n.band-item.overall[_ngcontent-%COMP%]   .band-label[_ngcontent-%COMP%], .band-item.overall[_ngcontent-%COMP%]   .band-value[_ngcontent-%COMP%] {\n  color: white;\n}\n.band-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  text-transform: uppercase;\n  margin-bottom: 4px;\n}\n.band-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text);\n}\n.feedback-section[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.feedback-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  margin-bottom: 8px;\n  color: var(--text);\n}\n.feedback-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.7;\n  color: var(--text-secondary);\n}\n.suggestions[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n.history-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.history-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  font-size: 12px;\n  text-transform: uppercase;\n  color: var(--text-secondary);\n  border-bottom: 2px solid var(--border);\n}\n.history-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-bottom: 1px solid var(--border);\n  font-size: 14px;\n}\n.clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.clickable[_ngcontent-%COMP%]:hover {\n  background: rgba(26, 86, 219, 0.03);\n}\n.band-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--primary);\n  font-size: 16px;\n}\n.card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 24px;\n  color: var(--text-light);\n}\n/*# sourceMappingURL=writing.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WritingComponent, { className: "WritingComponent", filePath: "src\\app\\features\\writing\\writing.component.ts", lineNumber: 166 });
})();
export {
  WritingComponent
};
//# sourceMappingURL=chunk-6AM4IGAL.js.map
