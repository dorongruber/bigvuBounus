import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { ImageFormat } from './image.model';

const IMGURL = 'https://bigvu-interviews-assets.s3.amazonaws.com/presenters.json';
const url = 'http://localhost:4000/';
@Injectable({providedIn: 'root'})
export class ImageService {
  changedImgUrl = new Subject<string>();
  image: string;
  changedTitle = new Subject<string>();
  title: string;
  onBackgroundColorChanged = new Subject<string>();
  imageList = new Subject<ImageFormat[]>();
  constructor(
    private http: HttpClient
  ) {}

  // async getImagesList(): Promise<ImageFormat[]> {

  //   const list: ImageFormat[] = [];
  //   await this.http.get<ImageFormat[]>(`${url}api/image/images`).pipe(catchError(this.handleError), tap(resdata => {
  //     resdata.forEach(data => {
  //       list.push(new ImageFormat(data.name, data.value));
  //     });
  //     console.log('res data => ', list);

  //   })).toPromise();
  //   setTimeout(() => {}, 2000);
  //   console.log('resbody -> ', list);
  //   return Promise.resolve(list.slice());
  //   // return Promise.resolve(imagesList.slice());
  // }

  getImagesList() {
    const list: ImageFormat[] = [];
    this.http.get<ImageFormat[]>(`${url}api/image/images`).pipe(tap(resdata => {
      resdata.forEach(data => {
        list.push(new ImageFormat(data.name, data.value));
      });
    })).subscribe(() => {
      this.imageList.next(list.slice());
    });
  }

  onChangeImage(imageurl: string) {

    this.image = imageurl;
    console.log('onChangeImage -> ', this.image);
    this.changedImgUrl.next(this.image);
  }

  onChangedTitle(t: string) {
    this.title = t;
    this.changedTitle.next(this.title);
  }

  onchangebackgroundColor(newColor: string) {
    this.onBackgroundColorChanged.next(newColor);
  }

}
