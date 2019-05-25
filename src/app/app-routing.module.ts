import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { QuizComponent } from './quiz/quiz.component';
// import { MaterializeModule } from 'angular2-materialize';

const routes: Routes = [
 
     { path: '', component: LandingComponent }, 
     { path: 'quiz', component: QuizComponent }, 
     { path: '**', redirectTo: '' }
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
