import { Component } from '@angular/core';
import GenericQuestion from 'app/contracts/generic_question';
import QuestionType from 'app/contracts/types';

// import { GenericQuestion, QuestionType } from 'app/components';
// import template from './question-track.html';
// import mainStyle from './question-track.css';
// import commonStyle from '../common.css';

@Component({
  selector: 'question-track',
  templateUrl: './question-track.html',
  styles: [
    './question-track.html'
  ]
})
export class QuestionTrackComponent extends GenericQuestion {

  public static type = QuestionType.Track;

  public init(): void {
    this.setTitle('Who is the artist of this track?');
    this.setCorrectAnswer(this.question.track.artists[0].name);
  }

}

export default QuestionTrackComponent;
