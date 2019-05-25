import { Component } from '@angular/core';
import { AnimationService } from 'css-animator';
import { LocaleService } from './locale.service';
import PlaylistService from './playlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    AnimationService,
    LocaleService,
    PlaylistService
  ]
,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-quiz-app';
}
