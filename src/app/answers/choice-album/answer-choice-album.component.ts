import { Component } from '@angular/core';

 
import { shuffle, randomTracksExcluding } from 'app/helpers'; 
import { QuizService } from 'app/quiz.service';
import GenericAnswer from '../generic_answer';
// import GenericAnswer from '../generic_answer';
// import { GenericAnswer } from '..';

@Component({
  selector: 'answer-choice-album',
  templateUrl: './answer-choice-album.html',
  styles: [
     './answer-choice-album.scss',
     '../common.css'
  ]
})
export class AnswerChoiceAlbumComponent extends GenericAnswer {

  public answers: { title: string, correct: boolean }[] = [];

  constructor(private quizService: QuizService) {
    super();
  }

  protected init(): void {
    const answers = [{ title: this.question.track.album.name, correct: true }];

    for (let randomTrack of randomTracksExcluding(this.question.track.id, 3, this.quizService.tracks)) {
      answers.push({
        title: randomTrack.album.name,
        correct: false
      });
    }

    shuffle(answers);
    this.answers = answers;
  }

}

export default AnswerChoiceAlbumComponent;
