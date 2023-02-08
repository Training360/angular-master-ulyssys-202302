import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, shareReplay, take, tap } from 'rxjs';

interface ICachedResponse {
  res: HttpResponse<any>;
  time: number;
}

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache: Map<string, ICachedResponse> = new Map();

  private validTime: number = 15000;

  private checkCache(): void {
    const targetTime = new Date().getTime() - this.validTime;
    this.cache.forEach((item: ICachedResponse, key: string) => {
      if (item.time < targetTime) {
        this.cache.delete(key);
      }
    });
  }

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    this.checkCache();

    const cachedResponse: ICachedResponse | undefined = this.cache.get(request.urlWithParams);

    if (cachedResponse) {
      return of(cachedResponse.res.clone());
    }

    return next.handle(request).pipe(
      tap((stateEvent) => {
        if (stateEvent instanceof HttpResponse) {
          this.cache.set(request.urlWithParams, {
            time: new Date().getTime(),
            res: stateEvent.clone(),
          });
        }
      }),
      shareReplay(),
    );
  }
}
