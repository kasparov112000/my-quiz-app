import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuestionsComponent } from './questions.component';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { AdBannerComponent } from './ad-banner.component';
import { HeroProfileComponent } from './hero-profile.component';

import { AdService } from './ad.service';
import { QuestionDirective } from './ad.directive';
import { QuestionAlbumComponent } from './album';
import { QuestionAudioComponent } from './audio';
import { QuestionImageComponent } from './image';
import { QuestionTrackComponent } from './track';
import { QuizService } from 'app/quiz.service';
import { ContainerRefDirective } from 'app/directives';
import { ANSWER_COMPONENTS } from 'app/answers';

@NgModule({
  imports: [BrowserModule],
  // providers: [{ provide: AdService, useClass: AdService},
  //   { provide: QuizService, useClass: QuizService},
  // ],
  providers: [


  ],
  declarations: [QuestionsComponent,
    QuestionAlbumComponent,
    QuestionAudioComponent,
    QuestionImageComponent,
    QuestionTrackComponent,
    AdBannerComponent,
    HeroJobAdComponent,
    HeroProfileComponent,
    ContainerRefDirective,
    [...ANSWER_COMPONENTS],
    QuestionDirective],



  exports: [
    QuestionsComponent
  ],
  entryComponents: [HeroJobAdComponent, HeroProfileComponent, QuestionAlbumComponent, QuestionAudioComponent, QuestionTrackComponent, QuestionImageComponent],
  bootstrap: [QuestionsComponent]
})
export class QuestionsModule {
  constructor() { }
}

