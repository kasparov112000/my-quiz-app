import { Component, OnInit, Provider } from '@angular/core';
 ;
//import { AnimationService, AnimationBuilder } from 'css-animator';
// import { LocaleService } from './locale.service';
// import PlaylistService from './playlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-quiz-app';

  //private _animator: AnimationBuilder;
  constructor(/*animationService: AnimationService*/) {
    //  this._animator = animationService.builder();
  }

  public ngOnInit(): void {
    // let loadingElem = document.getElementById('app-loading');
    // let spinningElem = loadingElem.querySelector('.loader');

    // this._animator
    //   .setDuration(600)
    //   .setType('fadeOut')
    //   .hide(loadingElem)
    //   .then(() => {
    //     spinningElem.classList.remove('running');
    //   });

  }

}
