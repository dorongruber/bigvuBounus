import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  isLoadingimg = false;
  isLoadingTitle = false;
  imgSubscription = new Subscription();
  imgurl = null;
  title = null;
  imgwidth = '100%';
  titleflexJC = 'center';
  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit() {

    this.imageService.onBackgroundColorChanged
    .subscribe(res => {
      console.log('response in canvas for color change -> ', res);
      document.getElementById('canvasframe').style.backgroundColor = res;
    });

    this.imageService.changedImgUrl
    .subscribe(res => {
      this.isLoadingimg = !this.isLoadingimg;
      console.log('changer image url -> ', res);
      this.imgurl = res;

      setTimeout(() => {
        this.isLoadingimg = !this.isLoadingimg;
        // document.getElementById('img-container').style.backgroundImage = `url(${this.imgurl})`;
      }, 500);
    });

    this.imageService.changedTitle
    .subscribe(res => {
      this.isLoadingTitle = !this.isLoadingTitle;
      this.title = res;
      console.log('got title -> ', this.title);
      setTimeout(() => {
        this.isLoadingTitle = !this.isLoadingTitle;
      }, 500);
    });
  }

  onOptionSelect(option: number) {
    console.log('onOptionSelect -> ', option);
    if (option === 1) {
      this.imgwidth = '66%';
      this.titleflexJC = 'flex-end';
    }
  }

  getImageUrl() {
    return `url(${this.imgurl})`;
  }



}
