import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { AnimatesDirective } from 'css-animator';
import { QuizService } from '../quiz.service';
 
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  
  @Output() public onGoHome = new EventEmitter<any>();
  @Output() public onRefresh = new EventEmitter<any>();
  @Output() public onClose = new EventEmitter<any>();

  constructor(private _quizService: QuizService) { }

  ngOnInit() {
  }


  public progress(): number {
    return this._quizService.progress();
  }

  public goHome(): void {
    this.onGoHome.emit();
  }

  public refresh(/*navAnimatesDirective: AnimatesDirective*/): void {
    this.onRefresh.emit();
  }

  public close(/*navAnimatesDirective: AnimatesDirective*/): void {
    this.onClose.emit();
   // navAnimatesDirective.hide({ type: 'fadeOutUp', delay: 400, duration: 600 });
  }
  

}
