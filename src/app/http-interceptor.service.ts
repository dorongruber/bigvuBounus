import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
// (event.status === 200 || event.status === 202)
@Injectable()
export class HttpStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(event => {
        console.log('returned state ->', event);
        if ((event instanceof HttpRequest)) {
          this.transferState.set(makeStateKey(req.url), event.body);
        }
      })
    );
  }
}
