import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  categories: any = [];
  max: number = 5;
  rate: any;
  term:any;
  ProductCategory: any;
  isReadonly: boolean = true;
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.fetchCategories();
    this.fetchProducts();
  }
  chooseCategory(id) {
    this.ProductCategory = id;
    console.log(this.ProductCategory);
  }
  fetchCategories() {
    this.http.get('//test-api.edfa3ly.io/category').toPromise()
      .then(res => {
        this.categories = res;
      })
      .catch(err => {
        console.log(err);
      })
  }
  fetchProducts() {
    this.http.get('//test-api.edfa3ly.io/product').toPromise()
      .then(res => {
        this.products = res;
      })
      .catch(err => {
        console.log(err);
      })
  }
}
