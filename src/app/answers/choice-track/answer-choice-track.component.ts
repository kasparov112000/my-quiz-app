import { Component } from '@angular/core';

 
import { shuffle, randomTracksExcluding } from 'app/helpers';
import { QuizService } from 'app/quiz.service';
import GenericAnswer from '../generic_answer';

 
@Component({
  selector: 'answer-choice-track',
  templateUrl: './answer-choice-track.html',
  styles: [
     './answer-choice-track.css',
     '../common.css'
  ]
})
export class AnswerChoiceTrackComponent extends GenericAnswer {

  public answers: { title: string, correct: boolean }[] = [];

  constructor(private quizService: QuizService) {
    super();
  }

  protected init(): void {
    const answers = [{ title: this.question.track.name, correct: true }];

    for (let randomTrack of randomTracksExcluding(this.question.track.id, 3, this.quizService.tracks)) {
      answers.push({
        title: randomTrack.name,
        correct: false
      });
    }

    shuffle(answers);
    this.answers = answers;
  }

}

export default AnswerChoiceTrackComponent;
