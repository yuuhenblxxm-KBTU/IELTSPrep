import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  RadioControlValueAccessor
} from "./chunk-4KX64OC2.js";
import {
  ApiService
} from "./chunk-S47TPVAJ.js";
import {
  ActivatedRoute,
  CommonModule,
  NgForOf,
  NgIf,
  Router,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-CLVG2C7R.js";

// src/app/features/exams/exam-take/exam-take.component.ts
function ExamTakeComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "span", 4);
    \u0275\u0275text(2, "hourglass_top");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Loading exam...");
    \u0275\u0275elementEnd()();
  }
}
function ExamTakeComponent_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "h3");
    \u0275\u0275text(2, "Reading Passage");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getPassage());
  }
}
function ExamTakeComponent_div_1_div_13_div_5_label_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 25)(1, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ExamTakeComponent_div_1_div_13_div_5_label_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const q_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.answers[q_r4.id], $event) || (ctx_r1.answers[q_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    const q_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.answers[q_r4.id] === opt_r5);
    \u0275\u0275advance();
    \u0275\u0275property("name", "q" + q_r4.id)("value", opt_r5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.answers[q_r4.id]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r5);
  }
}
function ExamTakeComponent_div_1_div_13_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275template(1, ExamTakeComponent_div_1_div_13_div_5_label_1_Template, 4, 6, "label", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", q_r4.options);
  }
}
function ExamTakeComponent_div_1_div_13_div_6_label_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 25)(1, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ExamTakeComponent_div_1_div_13_div_6_label_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const q_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.answers[q_r4.id], $event) || (ctx_r1.answers[q_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r7 = ctx.$implicit;
    const q_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.answers[q_r4.id] === opt_r7);
    \u0275\u0275advance();
    \u0275\u0275property("name", "q" + q_r4.id)("value", opt_r7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.answers[q_r4.id]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r7);
  }
}
function ExamTakeComponent_div_1_div_13_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275template(1, ExamTakeComponent_div_1_div_13_div_6_label_1_Template, 4, 6, "label", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", q_r4.options);
  }
}
function ExamTakeComponent_div_1_div_13_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function ExamTakeComponent_div_1_div_13_div_7_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const q_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.answers[q_r4.id], $event) || (ctx_r1.answers[q_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const q_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.answers[q_r4.id]);
  }
}
function ExamTakeComponent_div_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ExamTakeComponent_div_1_div_13_div_5_Template, 2, 1, "div", 21)(6, ExamTakeComponent_div_1_div_13_div_6_Template, 2, 1, "div", 21)(7, ExamTakeComponent_div_1_div_13_div_7_Template, 2, 1, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r4 = ctx.$implicit;
    const i_r9 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Question ", i_r9 + 1, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(q_r4.question_text);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", q_r4.question_type === "multiple_choice");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", q_r4.question_type === "true_false_notgiven");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", q_r4.question_type === "fill_blank");
  }
}
function ExamTakeComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div")(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 7);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 8)(8, "span", 9);
    \u0275\u0275text(9, "timer");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, ExamTakeComponent_div_1_div_11_Template, 5, 1, "div", 10);
    \u0275\u0275elementStart(12, "div", 11);
    \u0275\u0275template(13, ExamTakeComponent_div_1_div_13_Template, 8, 5, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 13)(15, "span", 14);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 15);
    \u0275\u0275listener("click", function ExamTakeComponent_div_1_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.exam.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.exam.questions.length, " questions \xB7 ", ctx_r1.exam.difficulty, "");
    \u0275\u0275advance();
    \u0275\u0275classProp("warning", ctx_r1.timeRemaining < 300);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatTimer(ctx_r1.timeRemaining), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getPassage());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.exam.questions);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.getAnsweredCount(), " / ", ctx_r1.exam.questions.length, " answered ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting ? "Submitting..." : "Submit Exam", " ");
  }
}
function ExamTakeComponent_div_2_div_10_div_3_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Correct: ", a_r11.correct_answer, "");
  }
}
function ExamTakeComponent_div_2_div_10_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40)(4, "span", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, ExamTakeComponent_div_2_div_10_div_3_span_6_Template, 2, 1, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 43);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r11 = ctx.$implicit;
    const i_r12 = ctx.index;
    \u0275\u0275classProp("correct", a_r11.is_correct)("wrong", !a_r11.is_correct);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r12 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Your answer: ", a_r11.given_answer || "(skipped)", "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !a_r11.is_correct);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r11.is_correct ? "check_circle" : "cancel");
  }
}
function ExamTakeComponent_div_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "h3");
    \u0275\u0275text(2, "Answer Review");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ExamTakeComponent_div_2_div_10_div_3_Template, 9, 8, "div", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.result.answers);
  }
}
function ExamTakeComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "h1");
    \u0275\u0275text(3, "Exam Complete!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Band Score");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 33);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, ExamTakeComponent_div_2_div_10_Template, 4, 1, "div", 34);
    \u0275\u0275elementStart(11, "button", 35);
    \u0275\u0275listener("click", function ExamTakeComponent_div_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(12, "Back to Exams");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("good", ctx_r1.result.score >= 7)("ok", ctx_r1.result.score >= 5 && ctx_r1.result.score < 7);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.result.score);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3(" ", ctx_r1.result.correct_answers, " / ", ctx_r1.result.total_questions, " correct \xB7 ", ctx_r1.formatTimer(ctx_r1.result.time_spent), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.result.answers);
  }
}
var ExamTakeComponent = class _ExamTakeComponent {
  constructor(route, router, api) {
    this.route = route;
    this.router = router;
    this.api = api;
    this.exam = null;
    this.result = null;
    this.answers = {};
    this.submitting = false;
    this.timeRemaining = 0;
    this.startTime = 0;
  }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.api.getExam(id).subscribe({
      next: (exam) => {
        this.exam = exam;
        this.timeRemaining = exam.time_limit * 60;
        this.startTime = Date.now();
        this.startTimer();
      }
    });
  }
  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.onSubmit();
      }
    }, 1e3);
  }
  formatTimer(seconds) {
    const m = Math.floor(Math.abs(seconds) / 60);
    const s = Math.abs(seconds) % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  getPassage() {
    const first = this.exam?.questions?.find((q) => q.passage_text);
    return first?.passage_text || null;
  }
  getAnsweredCount() {
    return Object.values(this.answers).filter((a) => a).length;
  }
  onSubmit() {
    clearInterval(this.timerInterval);
    this.submitting = true;
    const timeSpent = Math.floor((Date.now() - this.startTime) / 1e3);
    const answerList = this.exam.questions.map((q) => ({
      question_id: q.id,
      answer: this.answers[q.id] || ""
    }));
    this.api.submitExam({
      exam_id: this.exam.id,
      answers: answerList,
      time_spent: timeSpent
    }).subscribe({
      next: (res) => {
        this.result = res;
        this.submitting = false;
      },
      error: () => {
        this.submitting = false;
      }
    });
  }
  goBack() {
    this.router.navigate(["/exams"]);
  }
  static {
    this.\u0275fac = function ExamTakeComponent_Factory(t) {
      return new (t || _ExamTakeComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExamTakeComponent, selectors: [["app-exam-take"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 3, consts: [["class", "loading", 4, "ngIf"], ["class", "exam-page", 4, "ngIf"], ["class", "result-page", 4, "ngIf"], [1, "loading"], [1, "material-icons", "spin"], [1, "exam-page"], [1, "exam-header"], [1, "exam-info"], [1, "timer"], [1, "material-icons"], ["class", "card passage-card", 4, "ngIf"], [1, "questions"], ["class", "card question-card", 4, "ngFor", "ngForOf"], [1, "submit-bar"], [1, "answered-count"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "card", "passage-card"], [1, "passage-text"], [1, "card", "question-card"], [1, "q-number"], [1, "q-text"], ["class", "options", 4, "ngIf"], ["class", "form-group", "style", "margin-top:12px", 4, "ngIf"], [1, "options"], ["class", "option", 3, "selected", 4, "ngFor", "ngForOf"], [1, "option"], ["type", "radio", 3, "ngModelChange", "name", "value", "ngModel"], [1, "option-text"], [1, "form-group", 2, "margin-top", "12px"], ["type", "text", "placeholder", "Type your answer...", 3, "ngModelChange", "ngModel"], [1, "result-page"], [1, "result-banner"], [1, "result-score"], [1, "result-detail"], ["class", "card", 4, "ngIf"], [1, "btn", "btn-secondary", 3, "click"], [1, "card"], ["class", "review-item", 3, "correct", "wrong", 4, "ngFor", "ngForOf"], [1, "review-item"], [1, "review-num"], [1, "review-body"], [1, "review-given"], ["class", "review-correct", 4, "ngIf"], [1, "material-icons", "review-icon"], [1, "review-correct"]], template: function ExamTakeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ExamTakeComponent_div_0_Template, 5, 0, "div", 0)(1, ExamTakeComponent_div_1_Template, 19, 12, "div", 1)(2, ExamTakeComponent_div_2_Template, 13, 9, "div", 2);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", !ctx.exam && !ctx.result);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.exam && !ctx.result);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.result);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, RadioControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.exam-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.exam-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n}\n.exam-info[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 14px;\n}\n.timer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--text);\n  background: var(--bg-card);\n  padding: 12px 20px;\n  border-radius: var(--radius);\n  border: 1.5px solid var(--border);\n}\n.timer.warning[_ngcontent-%COMP%] {\n  color: var(--danger);\n  border-color: var(--danger);\n}\n.passage-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.passage-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.passage-text[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  line-height: 1.8;\n  font-size: 15px;\n}\n.question-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.q-number[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--primary);\n  text-transform: uppercase;\n  margin-bottom: 8px;\n}\n.q-text[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin-bottom: 14px;\n  line-height: 1.5;\n}\n.options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border: 1.5px solid var(--border);\n  border-radius: var(--radius-sm);\n  cursor: pointer;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.option[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary-light);\n  background: rgba(26, 86, 219, 0.03);\n}\n.option.selected[_ngcontent-%COMP%] {\n  border-color: var(--primary);\n  background: rgba(26, 86, 219, 0.06);\n}\n.option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  accent-color: var(--primary);\n}\n.submit-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 0;\n  margin-top: 16px;\n  border-top: 2px solid var(--border);\n}\n.answered-count[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.result-banner[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  border-radius: var(--radius);\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #f97316);\n  color: white;\n  margin-bottom: 24px;\n}\n.result-banner.good[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #059669);\n}\n.result-banner[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 12px;\n}\n.result-score[_ngcontent-%COMP%] {\n  font-size: 64px;\n  font-weight: 800;\n}\n.result-detail[_ngcontent-%COMP%] {\n  opacity: 0.85;\n  margin-top: 8px;\n}\n.review-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border);\n}\n.review-num[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 12px;\n}\n.review-item.correct[_ngcontent-%COMP%]   .review-num[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #065f46;\n}\n.review-item.wrong[_ngcontent-%COMP%]   .review-num[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.review-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.review-given[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n}\n.review-correct[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  color: var(--success);\n  font-weight: 600;\n}\n.review-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.review-item.correct[_ngcontent-%COMP%]   .review-icon[_ngcontent-%COMP%] {\n  color: var(--success);\n}\n.review-item.wrong[_ngcontent-%COMP%]   .review-icon[_ngcontent-%COMP%] {\n  color: var(--danger);\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 16px;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 32px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=exam-take.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExamTakeComponent, { className: "ExamTakeComponent", filePath: "src\\app\\features\\exams\\exam-take\\exam-take.component.ts", lineNumber: 177 });
})();
export {
  ExamTakeComponent
};
//# sourceMappingURL=chunk-NP6PD2WX.js.map
