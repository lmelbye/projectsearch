import { KeyValue } from '@angular/common';
import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, of, from, Observable, filter } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { GetProductsService } from './get-products/get-products.service';
import { Product, SearchProductResponse } from './get-products/products';

@Component({
  selector: 'app-search',
  templateUrl: './app.component.html',
  providers: [ GetProductsService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('searchField') input : ElementRef<HTMLInputElement>

  title = 'projectSearch';

  product : Product | undefined;
  productList : SearchProductResponse | undefined;
  testArr : Product[] | undefined;
  // searchArr : Product[] | undefined;

  currentSearch = ""

  constructor( private productGetter: GetProductsService) { }

  searchControl = new FormControl();
  searchResult : Product[] = [];

  ngOnInit(): void {
    // console.log(this.testNonObsJson())
    // this.testNonObsJson();
    this.getProductList()

    this.searchControl.valueChanges.pipe(
      debounceTime(250),
      tap(x =>  this.searchResult = []),
      switchMap(changedValue => this.getProducts(changedValue))
   ).subscribe(data => {
      this.searchResult.push(data);
    });
  //  ).subscribe(productList => this.product_list = productList);
  }

  getProductList() {
    this.productGetter.getProductList().subscribe(data => {
      this.productList = data;
      setTimeout(() => console.log(this.productList, "TEST ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤"), 2000);
      this.testArr = this.productList.content;
    })
  }

  getProducts(searchTerm : string) {
    let toFilter : Product[] = this.productList!.content!;

    return toFilter.filter(item => {
      return item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    })
  }

  /* getProducts(input : string) {
    let filteredProducts = ["hello", "world", "xkcd", "qed", "woorld"]
    
    return filteredProducts.filter(item => item.includes(input.toLocaleLowerCase()))
    // return filteredProducts.filter(item => item.indexOf(input.toLocaleLowerCase()) > -1)
  } */

  // on search: filter product list
    // first by name, possibly by productno
  /* searchTerm : string = "";
  createSearchTerm(key : KeyboardEvent) {
    if ((key.keyCode <= 90 && key.keyCode >= 48) || key.key == " " ) // quick fix to filter acceptable keys - accepts numbers, letters, and space
      this.searchTerm = this.searchTerm + key.key;
    if (key.key == "Backspace")
      this.searchTerm = this.searchTerm.slice(0,-1);  // again quick fix - doesn't take delete all into account
    // console.log(this.searchTerm)
    return this.searchTerm;
  } */
  
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  

  filterProducts(input : string) {
    let filteredProducts = from(["hello", "world", "xkcd", "qed", "woorld"])
    let newProducts = filteredProducts.pipe( 
      filter(item => item.toLowerCase().includes(input.toLocaleLowerCase())), //use switchMap
      debounceTime(500),
      distinctUntilChanged(),

      );
    return newProducts;
  }

  /* testTestArr : string[] = [];
  handleInput(event : Event) {
    this.currentSearch = this.getValue(event);
    from(this.getProducts(this.currentSearch)).pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(this.getProducts),
      tap(item => this.testTestArr.push(item))
    )
    .subscribe();
    console.log(this.testTestArr)
    // fromEvent(this.input, event).pipe()
    // this.filterProducts(this.currentSearch).subscribe(val => console.log(val))
  } */


  hello(input : KeyboardEvent) {
    // console.log(key)
    this.filterProducts(this.currentSearch).subscribe(val => console.log(val))
    // this.filterProducts(this.createSearchTerm(input)).subscribe(val => console.log(val))
  }

  /* fakeContinentsRequest(keys : any) { of(this.getContinents(keys))
  .pipe(
    tap(_ => console.log(`API CALL at ${new Date()}`))
  )}; */

  /* fromEvent(document.getElementById('typeAhead'), 'keyup')
  .pipe(
    debounceTime(200),
    map((e: any) => e.target.value),
    distinctUntilChanged(),
    switchMap(fakeContinentsRequest),
    tap(c => (document.getElementById('output').innerText = c.join('\n')))
  )
  .subscribe(); */


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
