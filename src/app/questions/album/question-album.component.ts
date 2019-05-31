import { Component } from '@angular/core';
   
 

// import template from './question-album.html';
// import mainStyle from './question-album.css';
// import commonStyle from '../common.css';
import GenericQuestion from 'app/contracts/generic_question';
import QuestionType from 'app/contracts/types';

@Component({
  selector: 'question-album',
  templateUrl: './question-album.html',
  styles: [
            './question-album.scss'
  ]
})
export class QuestionAlbumComponent extends GenericQuestion {

  public static type = QuestionType.Album;

  public init(): void {
    this.setTitle('Who is the artist of this album?');
    this.setCorrectAnswer(this.question.track.artists[0].name);
  }

}

export default QuestionAlbumComponent;
