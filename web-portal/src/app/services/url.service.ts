import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  backendConfig = {
    host: "http://localhost:3000",
  }
  routes = {
    url : this.backendConfig.host+"/url",
  }
  constructor(private http: HttpClient) { }

  createShortUrl(origUrl : string) : Observable<any> {
    return this.http.post(this.routes.url, {origUrl:origUrl}, { observe : 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getOriginalUrl(shortUrl : string) : Observable<any> {
    const path = new URL(shortUrl).pathname;
    return this.http.get(this.routes.url+path, { observe : 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // basic handler from https://angular.io/guide/http docs
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
