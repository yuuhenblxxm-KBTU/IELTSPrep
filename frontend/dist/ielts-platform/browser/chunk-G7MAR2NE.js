import {
  ApiService
} from "./chunk-S47TPVAJ.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  RouterLink,
  TitleCasePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-CLVG2C7R.js";

// src/app/features/exams/exam-list/exam-list.component.ts
var _c0 = (a0, a1) => ({ "badge-success": a0, "badge-warning": a1 });
var _c1 = (a0) => ["/exams", a0];
function ExamListComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 11);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 12)(11, "span")(12, "span", 4);
    \u0275\u0275text(13, "timer");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span")(16, "span", 4);
    \u0275\u0275text(17, "help_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 13);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "a", 14);
    \u0275\u0275text(22, " Start Exam ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const exam_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("reading", exam_r1.exam_type === "reading")("listening", exam_r1.exam_type === "listening");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(exam_r1.exam_type === "reading" ? "menu_book" : "headphones");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 13, exam_r1.exam_type), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(exam_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(exam_r1.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", exam_r1.time_limit, " min");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", exam_r1.question_count, " questions");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(15, _c0, exam_r1.difficulty === "intermediate", exam_r1.difficulty === "advanced"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(exam_r1.difficulty);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(18, _c1, exam_r1.id));
  }
}
function ExamListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 4);
    \u0275\u0275text(2, "quiz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No exams available for this filter");
    \u0275\u0275elementEnd()();
  }
}
function ExamListComponent_div_19_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, r_r2.created_at, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.score);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", r_r2.correct_answers, "/", r_r2.total_questions, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatTime(r_r2.time_spent));
  }
}
function ExamListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "h3");
    \u0275\u0275text(2, "Your Past Results");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 17)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Score");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Correct");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Time");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, ExamListComponent_div_19_tr_15_Template, 10, 8, "tr", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r2.results);
  }
}
var ExamListComponent = class _ExamListComponent {
  constructor(api) {
    this.api = api;
    this.exams = [];
    this.results = [];
    this.filter = "";
    this.loading = true;
  }
  ngOnInit() {
    this.api.getExams().subscribe({ next: (e) => {
      this.exams = e;
      this.loading = false;
    } });
    this.api.getExamHistory().subscribe({ next: (r) => this.results = r });
  }
  get filteredExams() {
    return this.filter ? this.exams.filter((e) => e.exam_type === this.filter) : this.exams;
  }
  setFilter(f) {
    this.filter = f;
  }
  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }
  static {
    this.\u0275fac = function ExamListComponent_Factory(t) {
      return new (t || _ExamListComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExamListComponent, selectors: [["app-exam-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 9, consts: [[1, "exams-page"], [1, "subtitle"], [1, "filter-bar"], [1, "filter-btn", 3, "click"], [1, "material-icons"], [1, "exam-grid"], ["class", "card exam-card", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], ["class", "card", "style", "margin-top: 32px;", 4, "ngIf"], [1, "card", "exam-card"], [1, "exam-type-badge"], [1, "exam-desc"], [1, "exam-meta"], [1, "badge", 3, "ngClass"], [1, "btn", "btn-primary", 2, "width", "100%", "margin-top", "16px", 3, "routerLink"], [1, "empty-state"], [1, "card", 2, "margin-top", "32px"], [1, "history-table"], [4, "ngFor", "ngForOf"], [1, "band-cell"]], template: function ExamListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Mock Exams");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p", 1);
        \u0275\u0275text(4, "Practice with reading and listening tests");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 2)(6, "button", 3);
        \u0275\u0275listener("click", function ExamListComponent_Template_button_click_6_listener() {
          return ctx.setFilter("");
        });
        \u0275\u0275text(7, "All");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "button", 3);
        \u0275\u0275listener("click", function ExamListComponent_Template_button_click_8_listener() {
          return ctx.setFilter("reading");
        });
        \u0275\u0275elementStart(9, "span", 4);
        \u0275\u0275text(10, "menu_book");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Reading ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 3);
        \u0275\u0275listener("click", function ExamListComponent_Template_button_click_12_listener() {
          return ctx.setFilter("listening");
        });
        \u0275\u0275elementStart(13, "span", 4);
        \u0275\u0275text(14, "headphones");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Listening ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 5);
        \u0275\u0275template(17, ExamListComponent_div_17_Template, 23, 20, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275template(18, ExamListComponent_div_18_Template, 5, 0, "div", 7)(19, ExamListComponent_div_19_Template, 16, 1, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275classProp("active", ctx.filter === "");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.filter === "reading");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.filter === "listening");
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.filteredExams);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredExams.length === 0 && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.results.length > 0);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, TitleCasePipe, DatePipe, RouterLink], styles: ["\n\n.exams-page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  margin-bottom: 4px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 24px;\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n}\n.filter-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: 1.5px solid var(--border);\n  background: white;\n  font-family: var(--font);\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.2s;\n  color: var(--text-secondary);\n}\n.filter-btn.active[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: white;\n  border-color: var(--primary);\n}\n.filter-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.exam-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n.exam-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.exam-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  margin-bottom: 12px;\n}\n.exam-type-badge.reading[_ngcontent-%COMP%] {\n  color: var(--primary);\n}\n.exam-type-badge.listening[_ngcontent-%COMP%] {\n  color: #8b5cf6;\n}\n.exam-type-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.exam-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 8px;\n}\n.exam-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  line-height: 1.5;\n  flex: 1;\n}\n.exam-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-top: 12px;\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.exam-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.exam-meta[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.history-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.history-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  font-size: 12px;\n  text-transform: uppercase;\n  color: var(--text-secondary);\n  border-bottom: 2px solid var(--border);\n}\n.history-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-bottom: 1px solid var(--border);\n  font-size: 14px;\n}\n.band-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--primary);\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: var(--text-light);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 48px;\n  opacity: 0.3;\n  margin-bottom: 8px;\n}\n/*# sourceMappingURL=exam-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExamListComponent, { className: "ExamListComponent", filePath: "src\\app\\features\\exams\\exam-list\\exam-list.component.ts", lineNumber: 120 });
})();
export {
  ExamListComponent
};
//# sourceMappingURL=chunk-G7MAR2NE.js.map
