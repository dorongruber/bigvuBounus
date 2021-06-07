import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CanvasComponent } from './mainpage/canvas/canvas.component';
import { InputsComponent } from './mainpage/inputs/inputs.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserStateInterceptor } from './browser-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    CanvasComponent,
    InputsComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    TransferHttpCacheModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
