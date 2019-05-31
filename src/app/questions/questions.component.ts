import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { AdService } from './ad.service';
import { AdItem } from './ad-item';
import Question from 'app/contracts/question';
import { ContainerRefDirective } from 'app/directives';
import { QuizService } from 'app/quiz.service';
import Unsubscriber from 'app/contracts/unsubscriber';
import GenericQuestion from 'app/contracts/generic_question';
import { QUESTIONS_COMPONENTS_MAP } from '.';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
})

export class QuestionsComponent extends Unsubscriber implements OnInit, AfterViewInit {
  @ViewChild(ContainerRefDirective) public questionHost: ContainerRefDirective;
  @Input() public question: Question;

  ads: AdItem[];
  private _questions: Question[] = [];
  private _ready: boolean = false;
  private _active: boolean = false;

  private component: GenericQuestion;

  constructor(private adService: AdService, private _quizService: QuizService, private resolver: ComponentFactoryResolver) {
    super();
    this.subscribeToActivate();
    this.subscribeToClose();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadComponent().then(() => {
        if (this.question.id === this._quizService.totalQuestions)
        {
          setTimeout(() => {
            this._quizService.ready();
          }, 100);
        }
      });
    });
  }

  ngOnInit() {
    this.ads = this.adService.getAds();
  }

  private subscribeToActivate(): void {
    let subscription = this._quizService
      .onActivateQuestion.subscribe((questionNumber: number) => {
        if (questionNumber === this.question.id)
        {
          this.activateQuestion();
        } else if (this.active)
        {
          this.deactivateQuestion();
        }
      });

    this.subscriptions.push(subscription);
  }

  get active(): boolean {
    return this._active;
  }

  private activateQuestion(): void {
    this.component.activate();

    this._active = true;
    // this._animator.setType('fadeInRight').setDelay(200);

    // if (this.question.id === 1) {
    //   this._animator.setType('fadeInUp');
    // }

    //  this._animator.show(this._elementRef.nativeElement);
  }

  private deactivateQuestion(): void {
    this.component.deactivate();

    // this._animator.setType('fadeOutLeft').setDelay(0).setDuration(600);

    if (this.question.id === this._quizService.totalQuestions)
    {
      //  this._animator.setType('fadeOutDown');
      this._quizService.completed();
    }

    //  this._animator.hide(this._elementRef.nativeElement);
    this._active = false;
  }

  private subscribeToClose(): void {
    let subscription = this._quizService
      .onClose
      .subscribe((questionNumber: number) => {
        // if (this._active) {
        //   this._animator
        //     .setType('fadeOutDown')
        //     .setDuration(600)
        //     .hide(this._elementRef.nativeElement);
        // }
      });

    this.subscriptions.push(subscription);
  }

  private async loadComponent(): Promise<void> {
    // const componentFactory = this.resolver.resolveComponentFactory(QUESTIONS_COMPONENTS_MAP[0]);
    const componentFactory = this.resolver.resolveComponentFactory(QUESTIONS_COMPONENTS_MAP[this.question.type]);

    const viewContainerRef = this.questionHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const component = componentRef.instance as GenericQuestion;
    component.question = this.question;
    component.init();

    this.component = component;
  }

  get quizService(): QuizService {
    return this._quizService;
  }

  get hasAnswer(): boolean {
    if (!this.component)
    {
      return false;
    }
  }
}

