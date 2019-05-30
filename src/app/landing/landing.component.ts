import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
// import { AnimationBuilder, AnimationService } from 'css-animator';
import { Router } from '@angular/router';
import { RegionOptions, REGION_VALUES } from './region_options';
import { LocaleService } from 'app/locale.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  public selectOptions: RegionOptions[] = REGION_VALUES;
  public submitted = false;

  // private _animator: AnimationBuilder;
  private _regionSelection: any;

  constructor(
    private _elementRef: ElementRef,
    private router: Router,
    private _localeService: LocaleService,
    //animationService: AnimationService
    ) {
  //  this._animator = animationService.builder();
  }

  public ngOnInit() {
    this._regionSelection = this._localeService.locale.value;
  }

  public ngAfterViewInit() {
    // this._animator
    //   .setType('fadeInUp')
    //   .setDelay(150)
    //   .setDuration(700)
    //   .show(this._elementRef.nativeElement);
  }

  get regionSelection() {
    return this._regionSelection;
  }

  set regionSelection(value) {
    let locale;

    for (let region of this.selectOptions) {
      if (region.value === value) {
        locale = region;
      }
    }

    this._localeService.locale = locale || value;
    this._regionSelection = value;
  }

  public startQuiz(myElement): void {
    // if (this.submitted) {
    //   return;
    // }

    // this.submitted = true;
    this.router.navigate(['quiz']);

    // this._animator
    //   .setType('fadeOutDown')
    //   .setDelay(350)
    //   .setDuration(600)
    //   .hide(myElement)
    //   .then(() => {
    //     this.router.navigate(['quiz']);
    //   }).catch(error => {
    //     console.log(error);
    //  });
  }

}

 
