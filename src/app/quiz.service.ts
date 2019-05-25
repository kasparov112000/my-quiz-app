import { Injectable, EventEmitter, isDevMode } from '@angular/core';
import { Playlist, Track, QuestionType, Question } from './contracts';
import { shuffle, scrollTo } from 'app/helpers';
import { Observable } from 'rxjs';
import { PlaylistService } from './playlist.service';
import { delay, map, first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private _scrollDuration = 100;

  private _onReady = new EventEmitter<void>();
  private _onActivateQuestion = new EventEmitter<number>();
  private _onCompleted = new EventEmitter<void>();
  private _onClose = new EventEmitter<void>();
  private _onRefresh = new EventEmitter<void>();

  private _numberOfQuestions: number;
  private _progress: number;
  private _playlist: Playlist;
  private _tracks: Track[];
  private _random: Track[];
  private _questions: Question[];
  constructor(private playlistService: PlaylistService) { }

  public progress(): number {
    return this.calculateProgress();
  }
  private calculateProgress(): number {
    let count = 0;

    for (let question of this.questions)
    {
      if (question.answered)
      {
        count++;
      }
    }

    return (count / this.totalQuestions) * 100;
  }

  get totalQuestions(): number {
    return this.questions.length;
  }

  get questions(): Question[] {
    return this._questions || [];
  }

  get playlist(): Playlist {
    return this._playlist;
  }

  get tracks(): Track[] {
    return this._tracks;
  }

  get onReady(): EventEmitter<void> {
    return this._onReady;
  }

  get onActivateQuestion(): EventEmitter<number> {
    return this._onActivateQuestion;
  }

  get onCompleted(): EventEmitter<void> {
    return this._onCompleted;
  }

  get onClose(): EventEmitter<void> {
    return this._onClose;
  }

  get onRefresh(): EventEmitter<void> {
    return this._onRefresh;
  }

  public activateQuestion(questionNumber: number): void {
    scrollTo(document.body, 0, this._scrollDuration).then(() => {
      this._onActivateQuestion.emit(questionNumber);
    });
  }
  
  public refresh(): void {
    this._progress = 0;
    this._playlist = null;
    this._tracks = [];
    this._random = [];
    this._questions = [];

    this.init(this._numberOfQuestions)
      .pipe(first())
      .subscribe((questions: Question[]) => {
        scrollTo(document.body, 0, this._scrollDuration).then(() => {
          this.onRefresh.emit();
        });
      });
  }


  private loadMockData(wait = 500): Observable<Question[]> {
    return this.playlistService.getMockPlaylist().pipe(
        delay(wait),
        map((playlist: Playlist) => this.extractTracks(playlist)),
        map((tracks: Track[]) => this.extractRandom(tracks)),
        map((tracks: Track[]) => this.buildQuestions(tracks)),
      );
  }
  public init(numberOfQuestions: number): Observable<Question[]> {
    this._numberOfQuestions = numberOfQuestions;

    if (isDevMode()) {
      return this.loadMockData();
    }

    return this.loadProductionData();
  }

  private loadProductionData(): Observable<Question[]> {
    return this.playlistService.getPlaylist().pipe(
        map((playlist: Playlist) => this.extractTracks(playlist)),
        map((tracks: Track[]) => this.extractRandom(tracks)),
        map((tracks: Track[]) => this.buildQuestions(tracks))
      );
  }
  private extractTracks(playlist: Playlist) {
    let tracks: Track[] = [];

    playlist.tracks.items.forEach((item, key) => {
      tracks.push(item.track);
    });

    this._playlist = playlist;
    this._tracks = tracks;

    return tracks;
  }

  public close(): void {
    scrollTo(document.body, 0, this._scrollDuration).then(() => {
      this.onClose.emit();
    });
  }

  private getRandomTracks(amount: number): Track[] {
    let randomTracks: Track[] = [];
    let taken: number[] = [];

    for (let i = 0; i < amount; i++) {
      let current: number;
      let track: Track;

      do {
        current = Math.floor(Math.random() * this._tracks.length);
        track = this._tracks[current];
      } while (
        taken.indexOf(current) >= 0 ||
        !track.preview_url ||
        !track.album ||
        !track.album.images ||
        !track.album.images[0] ||
        !track.album.images[0].url
      );

      taken.push(current);
      randomTracks.push(track);
    }

    return randomTracks;
  }

  private extractRandom(tracks: Track[]) {
    return this._random = this.getRandomTracks(this._numberOfQuestions);
  }

  private buildQuestions(randomTracks: Track[]) {
    let questions: Question[] = [];
    let count = 0;

    for (let track of randomTracks) {
      count++;

      let type = count === 1 ? QuestionType.Audio : null;

      type = type === null ?
        Math.floor(Math.random() * (Object.keys(QuestionType).length / 2))
        : type;

      let question: Question = {
        id: -1,
        type: type,
        track: track,
        answer: undefined,
        correctAnswer: undefined,
        answered: false,
        wasCorrect: false
      };

      questions.push(question);
    }

    count = 1;
    this._questions = shuffle(questions.slice(1)).map((question) => {
      question.id = ++count;
      return question;
    });

    questions[0].id = 1;
    this._questions.unshift(questions[0]);

    return this._questions;
  }

  public ready(): void {
    scrollTo(document.body, 0, this._scrollDuration).then(() => {
      this._onReady.emit();
    });
  }

  public completed(): void {
    scrollTo(document.body, 0, this._scrollDuration).then(() => {
      this._onCompleted.emit();
    });
  }

}
