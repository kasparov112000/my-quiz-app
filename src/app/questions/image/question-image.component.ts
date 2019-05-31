import { Component } from '@angular/core';
import GenericQuestion from 'app/contracts/generic_question';
import QuestionType from 'app/contracts/types';

// import { GenericQuestion, QuestionType } from 'app/components';
// import template from './question-image.html';
// import mainStyle from './question-image.css';
// import commonStyle from '../common.css';

@Component({
  selector: 'question-image',
  templateUrl: './question-image.html',
  styles: [
    './question-image.html'
  ]
})
export class QuestionImageComponent extends GenericQuestion {

  public static type = QuestionType.Image;

  public init(): void {
    this.setTitle('What is the name of this album?');
    this.setCorrectAnswer(this.question.track.album.name);
  }

}

export default QuestionImageComponent;
