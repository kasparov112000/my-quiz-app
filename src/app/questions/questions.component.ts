import { Component, OnInit } from '@angular/core';
import { AdService }         from './ad.service';
import { AdItem }            from './ad-item';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
})

export class QuestionsComponent implements OnInit {
  ads: AdItem[];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}

