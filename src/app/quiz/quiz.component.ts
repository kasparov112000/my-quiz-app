import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/quiz.service';
import Unsubscriber from 'app/contracts/unsubscriber';
 
import { Router } from '@angular/router';
import { AnimatesDirective } from 'css-animator';
import Question from 'app/contracts/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [
    QuizService
  ]
})
export class QuizComponent extends Unsubscriber implements OnInit {

  private _questions: Question[] = [];
  private _ready: boolean = false;

  constructor(
    private _router: Router,
    private _quizService: QuizService
  ) {
    super();

    let onReady = this.quizService
      .onReady
      .subscribe(() => {
        this._ready = true;
        this.quizService.activateQuestion(1);
      });

    let onRefresh = this.quizService
      .onRefresh
      .subscribe(() => {
        this._questions = this.quizService.questions;
        this._ready = true;
      });

    this.subscriptions.push(onReady);
    this.subscriptions.push(onRefresh);
  }

  public ngOnInit(): void {
    this.quizService
      .init(10)
      .subscribe((questions) => {
        this._questions = this.quizService.questions;
      });
  }

  public trackByQuestion(question: Question): number {
    return question.id;
  }

  public onGoHome(/*navAnimatesDirective: AnimatesDirective*/): void {
    setTimeout(() => {
      this._router.navigate(['/']);
    }, 1000);

    this.quizService.close();
  }



  public onRefresh(/*navAnimatesDirective: AnimatesDirective*/): void {
    this.quizService.close();

    setTimeout(() => {
      this._ready = false;
      setTimeout(() => {
        this.quizService.refresh();
      });
    }, 700);
  }

  public onClose(/*navAnimatesDirective: AnimatesDirective*/): void {
     this.onGoHome(/*navAnimatesDirective*/);
  }

  get questions(): Question[] {
    return this._questions;
  }

  get ready(): boolean {
    return this._ready;
  }

  get quizService(): QuizService {
    return this._quizService;
  }

}