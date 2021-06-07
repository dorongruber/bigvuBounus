import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ImageFormat } from '../image.model';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  @ViewChild('titleInput', {static: true}) titleInput: ElementRef;
  imgList: ImageFormat[] = [];
  currentImage = 'Enter Image';
  listFlag = false;
  tempTitleString = '';
  debonceTitle = [];
  constructor(
    private imageService: ImageService,
    private renderer2: Renderer2,
    private title: Title,
    private meta: Meta

  ) { }

  async ngOnInit() {

    // this.titleInput.addEventListener('keyup', this.debounce(this.temp, 1000));
    // (this.titleInput.nativeElement as HTMLElement).addEventListener('keyup', this.debounce(this.temp, 1000));
    (this.titleInput.nativeElement as HTMLElement).addEventListener('keyup', this.debounce((debouncearray: string) => {
      // console.log('event -> ', debouncearray[0].key);
      const templist = [];
      // for (let i = 0; i < Object.keys(debouncearray).length; i++) {
      //   templist.push(debouncearray[i].key);
      // }
      let temptitle = '';
      const words = debouncearray.split(' ');
      words.forEach(w => {
        console.log('word -> ', w);
        if (w.length < 11 ) {
          temptitle += `${w} `;
        } else {
          const fw = w.slice(0, 8);
          const lw = w.slice(9);
          console.log('spliteword -> ', fw, lw, w.length);
          temptitle += `${fw} ${lw} `;
        }
      });
      const title = temptitle;
      console.log('temp list => ', title);
      this.imageService.onChangedTitle(title);
    }, 1000));

    this.imageService.imageList
    .subscribe(resList => {
      this.imgList = resList;
    });
    if (this.imgList.length === 0) {
      this.imageService.getImagesList();
    }


  }

  onImageSelect(imageurl: string) {
    this.currentImage = imageurl;
    console.log('selected image -> ', this.currentImage);
    this.imageService.onChangeImage(this.currentImage);
    this.onImagetagClick();
  }

  onImagetagClick() {
    this.listFlag = !this.listFlag;
  }

  onTitleTyping(event: KeyboardEvent) {
    console.log(event);
  }

  debounce = (func, wait) => {
    let timeout;
    return (arg) => {
      if (arg.key === 'Backspace') {
        this.tempTitleString = this.tempTitleString.split(this.tempTitleString[this.tempTitleString.length - 1])[0];
      } else if (arg.key !== 'Shift') {
        if ( this.tempTitleString !== undefined) {
          this.tempTitleString = `${this.tempTitleString}${arg.key}`;
        } else {
          this.tempTitleString = `${arg.key}`;
        }
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        console.log('args => ', arg);
        func(this.tempTitleString);
      }, wait);
    };
  }

}
