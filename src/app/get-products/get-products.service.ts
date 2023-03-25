import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';

import { Product, SearchProductResponse } from './products';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  productUrl = 'assets/products.json'

  // C:\Users\Bruger\Documents\GitHub\projectsearch\src\assets\products.json

  constructor(private http : HttpClient) { }

  testInjectable() {
    console.log("Hello from GetProductService!");
  }

  getJson() {
    const a : Observable<Product> = this.http.get<Product>(this.productUrl)
      .pipe(
        take(5),
        retry(3),
        catchError(this.handleError)
      )
    // console.log(a.subscribe(), "ASYNC #######################################")
    /* return this.http.get<Product>(this.productUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      ) */
    // console.log(this.productUrl)
    return a;
  }

  getProductList() {
    return this.http.get<SearchProductResponse>(this.productUrl)
  }

  getObservableJson(): Observable<HttpResponse<Product>> {
    return this.http.get<Product>(
      this.productUrl, { observe: 'response' } );
  }

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
