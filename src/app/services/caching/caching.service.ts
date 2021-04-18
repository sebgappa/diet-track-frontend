import { Injectable } from '@angular/core';
import { startWith, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  constructor() { }

  public cacheData<T>(observable: Observable<T>, serviceName: string, endpointUrl: string, params: string): Observable<T> {
    const cacheKey = `${serviceName}-${endpointUrl}-${params}`;

    observable = observable.pipe(tap(response => {
      localStorage.setItem(cacheKey, JSON.stringify(response));
    }));

    if (localStorage.getItem(cacheKey)) {
      observable = observable.pipe(startWith(JSON.parse(localStorage.getItem(cacheKey))));
    }

    return observable;
  }
}

