import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuestionsComponent } from './questions.component';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { AdBannerComponent } from './ad-banner.component';
import { HeroProfileComponent } from './hero-profile.component';

import { AdService } from './ad.service';
import { QuestionDirective } from './ad.directive';

@NgModule({
  imports: [BrowserModule],
  providers: [{ provide: AdService, useClass: AdService }],

  declarations: [QuestionsComponent,
    AdBannerComponent,
    HeroJobAdComponent,
    HeroProfileComponent,
    QuestionDirective],

  exports: [
    QuestionsComponent
  ],
  entryComponents: [HeroJobAdComponent, HeroProfileComponent],
  bootstrap: [QuestionsComponent]
})
export class QuestionsModule {
  constructor() { }
}

