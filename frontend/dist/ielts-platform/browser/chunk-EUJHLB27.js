import {
  ApiService
} from "./chunk-S47TPVAJ.js";
import {
  ActivatedRoute,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-CLVG2C7R.js";

// src/app/features/writing/submission-detail/submission-detail.component.ts
function SubmissionDetailComponent_div_0_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4, "Overall Band");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.submission.feedback.overall_band);
  }
}
function SubmissionDetailComponent_div_0_div_15_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19);
    \u0275\u0275element(2, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21)(4, "span", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 23);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", item_r2.value / 9 * 100, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.value);
  }
}
function SubmissionDetailComponent_div_0_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275template(1, SubmissionDetailComponent_div_0_div_15_div_1_Template, 8, 4, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.bandItems);
  }
}
function SubmissionDetailComponent_div_0_p_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Prompt: ", ctx_r0.submission.prompt, "");
  }
}
function SubmissionDetailComponent_div_0_div_22_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "h4");
    \u0275\u0275text(2, "\u2705 Strengths");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.submission.feedback.strengths);
  }
}
function SubmissionDetailComponent_div_0_div_22_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "h4");
    \u0275\u0275text(2, "\u{1F4A1} Suggestions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.submission.feedback.suggestions);
  }
}
function SubmissionDetailComponent_div_0_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "h3");
    \u0275\u0275text(2, "AI Feedback");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, SubmissionDetailComponent_div_0_div_22_div_5_Template, 5, 1, "div", 26)(6, SubmissionDetailComponent_div_0_div_22_div_6_Template, 5, 1, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.submission.feedback.feedback_text);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.submission.feedback.strengths);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.submission.feedback.suggestions);
  }
}
function SubmissionDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "a", 2)(2, "span", 3);
    \u0275\u0275text(3, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Back to Writing ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 4)(6, "div")(7, "h1");
    \u0275\u0275text(8, "Writing Submission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 5)(10, "span", 6);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, SubmissionDetailComponent_div_0_div_14_Template, 5, 1, "div", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, SubmissionDetailComponent_div_0_div_15_Template, 2, 1, "div", 8);
    \u0275\u0275elementStart(16, "div", 9)(17, "h3");
    \u0275\u0275text(18, "Your Essay");
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, SubmissionDetailComponent_div_0_p_19_Template, 2, 1, "p", 10);
    \u0275\u0275elementStart(20, "div", 11);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, SubmissionDetailComponent_div_0_div_22_Template, 7, 3, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.submission.task_type);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(13, 8, ctx_r0.submission.created_at, "medium"), " \xB7 ", ctx_r0.submission.word_count, " words ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.submission.feedback);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.submission.feedback);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.submission.prompt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.submission.essay);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.submission.feedback);
  }
}
var SubmissionDetailComponent = class _SubmissionDetailComponent {
  constructor(route, api) {
    this.route = route;
    this.api = api;
    this.submission = null;
    this.bandItems = [];
  }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.api.getSubmission(id).subscribe({
      next: (s) => {
        this.submission = s;
        if (s.feedback) {
          this.bandItems = [
            { label: "Task Achievement", value: s.feedback.task_achievement },
            { label: "Coherence & Cohesion", value: s.feedback.coherence_cohesion },
            { label: "Lexical Resource", value: s.feedback.lexical_resource },
            { label: "Grammar Accuracy", value: s.feedback.grammar_accuracy }
          ];
        }
      }
    });
  }
  static {
    this.\u0275fac = function SubmissionDetailComponent_Factory(t) {
      return new (t || _SubmissionDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SubmissionDetailComponent, selectors: [["app-submission-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "detail-page", 4, "ngIf"], [1, "detail-page"], ["routerLink", "/writing", 1, "back-link"], [1, "material-icons"], [1, "header-row"], [1, "meta"], [1, "badge", "badge-info"], ["class", "overall-band", 4, "ngIf"], ["class", "card band-grid", 4, "ngIf"], [1, "card"], ["class", "prompt", 4, "ngIf"], [1, "essay-text"], ["class", "card", 4, "ngIf"], [1, "overall-band"], [1, "band-number"], [1, "band-text"], [1, "card", "band-grid"], ["class", "band-item", 4, "ngFor", "ngForOf"], [1, "band-item"], [1, "band-bar-bg"], [1, "band-bar-fill"], [1, "band-info"], [1, "band-name"], [1, "band-score"], [1, "prompt"], [1, "feedback-text"], ["class", "section", 4, "ngIf"], [1, "section"], [1, "suggestions"]], template: function SubmissionDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, SubmissionDetailComponent_div_0_Template, 23, 11, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.submission);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, RouterLink], styles: ["\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--primary);\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 24px;\n}\n.header-row[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n}\n.meta[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 14px;\n  margin-top: 6px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.overall-band[_ngcontent-%COMP%] {\n  text-align: center;\n  background: var(--primary);\n  color: white;\n  padding: 16px 24px;\n  border-radius: var(--radius);\n}\n.band-number[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 36px;\n  font-weight: 800;\n}\n.band-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.8;\n}\n.band-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  margin-bottom: 24px;\n}\n.band-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.band-bar-bg[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 10px;\n  background: var(--border);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.band-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      var(--accent));\n  border-radius: 5px;\n  transition: width 0.5s;\n}\n.band-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 200px;\n}\n.band-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  width: 140px;\n}\n.band-score[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n}\n.card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  margin-bottom: 14px;\n}\n.prompt[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: var(--text-secondary);\n  margin-bottom: 12px;\n  font-size: 14px;\n}\n.essay-text[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  line-height: 1.8;\n  font-size: 15px;\n}\n.feedback-text[_ngcontent-%COMP%] {\n  line-height: 1.7;\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n}\n.section[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.7;\n  color: var(--text-secondary);\n}\n.suggestions[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n/*# sourceMappingURL=submission-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SubmissionDetailComponent, { className: "SubmissionDetailComponent", filePath: "src\\app\\features\\writing\\submission-detail\\submission-detail.component.ts", lineNumber: 108 });
})();
export {
  SubmissionDetailComponent
};
//# sourceMappingURL=chunk-EUJHLB27.js.map
