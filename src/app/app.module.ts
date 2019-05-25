import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AnimatorModule } from 'css-animator';
// import { MaterializeModule } from 'angular2-materialize';
import { LandingComponent } from './landing/landing.component';
import { FormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { APP_BASE_HREF } from '@angular/common';
import PlaylistService from './playlist.service';
import { HttpModule } from '@angular/http';
import { LocaleService } from './locale.service';
import { QuestionComponent } from './question/question.component';

const appBaseHref = '/* @echo config.appBaseHref */';
const baseHref = appBaseHref.includes('config.appBaseHref') ? '/' : appBaseHref;

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    QuizComponent,
    QuestionComponent
  ],
  
  imports: [
    BrowserModule,
    AnimatorModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
    

  ],
   providers: [ 
     PlaylistService,
     LocaleService
   ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
