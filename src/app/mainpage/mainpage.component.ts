import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ImageService } from './image.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {


  list = [];

  backgroundColor = false;
  routerColor = 'white';

  constructor(
    private title: Title,
    private meta: Meta,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.title.setTitle('CanvasProject');
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/canvas' },
      { name: 'og:title', content: 'CanvasProject' }
    ]);

    this.route.url.subscribe(res => {
      console.log('res -> ', res);
      if (res !== undefined && res.length > 0) {
        console.log('res url => ', res[0].path);
        this.routerColor = res[0].path;
        if (this.routerColor === 'white') {
          this.imageService.onchangebackgroundColor(this.routerColor);
          this.backgroundColor = false;
        } else {
          this.imageService.onchangebackgroundColor(this.routerColor);
          this.backgroundColor = true;
        }
      }

    });

  }

}
