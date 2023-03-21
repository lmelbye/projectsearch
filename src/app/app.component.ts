import { Component, OnInit } from '@angular/core';
import { GetProductsService } from './get-products/get-products.service';
import { fromEvent, take } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './app.component.html',
  providers: [ GetProductsService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'projectSearch';

  constructor(
    private products: GetProductsService
  ) {}
  ngOnInit(): void {
    this.testNonObsJson();
    // this.testObsJson();
  }

  testObsJson() {
    console.log("helloFromObs");
    const a = this.products.getObservableJson().pipe(take(5)).subscribe(x => {return x.body});
    console.log(a);
  }
  testNonObsJson() {
    // const a = this.products.getJson();
    return this.products.getJson();
    // console.log(a + "------------------------")
    // const b = a.pipe(take())
    // const b = a.forEach(value => {console.log(value)})
    // return a;
  }

  /* search bar solution from learnrxjs.com -- most likely plug and play? */
  // observable of values from a text box, pipe chains operators together
    /* inputValue
    .pipe(
      // wait for a 200ms pause
      debounceTime(200),
      // if the value is the same, ignore
      distinctUntilChanged(),
      // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
      switchMap(searchTerm => typeaheadApi.search(searchTerm))
    )
    // create a subscription
    .subscribe(results => {
      // update the dom
    }); */

}
