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

  constructor( private productGetter: GetProductsService) { }
  

  // The hashmap data structure allows for very fast searches because each key is hashed to a value between 0 and n-1 (n being the map's length)
  // The hash value maps to an address in memory and we do not have to look through the entire structure to find our key, unlike looking through a list
  productList : SearchProductResponse | undefined;
  searchResult : Product[] = [];
  searchControl = new FormControl();

  // productList is populated on init because I did not have time to figure out how to load it only on first search.
    // The simplest implementation I can think of would be to set a productListLoaded = true flag in the valueChanges pipe.
    // Then if(!productListLoaded){ getProductList() } in the pipe should create the correct behaviour.
  ngOnInit(): void {
    this.getProductList()

    this.searchControl.valueChanges.pipe(
      debounceTime(250),
      tap(x =>  this.searchResult = []),
      switchMap(changedValue => this.getProducts(changedValue))
   ).subscribe(data => {
      this.searchResult.push(data);
    });
  }

  getProductList() {
    this.productGetter.getProductList().subscribe(data => {
      this.productList = data;
    })
  }

  // working search method - not free text
  getProducts(searchTerm : string) {
    let toFilter : Product[] = this.productList!.content!;
    
    return toFilter.filter(item => {
      return item.title.toLocaleLowerCase().includes(searchTerm);
    })
  }
  
  // I attempted free text search but could not get it working in time. My thoughts on getting it working:
    // I would split search term and product.title into arrays.
    // Then I would create a double loop to compare each index and return the product for matching indexes
    // Ideally, I would then sort the resulting array by number of matches, to boost relevancy

}
