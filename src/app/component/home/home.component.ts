import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderService, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#ff0000',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: SPINNER.ballSpinClockwise,
  blur: 13,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#281b1b',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: SPINNER.ballSpinClockwise,
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: 'https://raw.githubusercontent.com/t-ho/ngx-ui-loader/master/src/assets/angular.png',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#0065ff',
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
};


@Component({
  selector: 'app-home',
  standalone: true,
  providers : [NgxUiLoaderService],
  imports: [CommonModule, NgxUiLoaderModule , RouterLink, RouterModule,
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent implements OnInit {
  constructor(private ngxLoader: NgxUiLoaderService){
    this.ngxLoader.start();
    // Stop loader after 3 sec
  setTimeout(() => {
    this.ngxLoader.stop();
  }, 500);
  }


  ngOnInit(): void {


  }
}
