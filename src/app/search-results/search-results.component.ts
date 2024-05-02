import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductService } from '../services/product/product.service';


@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [    MDBBootstrapModule,
    NavbarComponent,
    ProductComponent,
    NgIf,
    NgFor,
    HttpClientModule,
    NgxGalleryModule,
    CommonModule,
    RouterModule],
  providers: [ProductService],

  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{
  @Input() searchWord: any;
  userSession: any;
  user: any;
  products: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.searchWord = "";
  }
  // getAllProducts(){
  //   this.userSession = sessionStorage.getItem('user');
  //   this.user = JSON.parse(this.userSession);
  //   this.productService.GetAllProducts(this.user.token).subscribe({
  //     next: (data: any) => {
  //       this.products = data;
  //       const products = data.filter((product:any)=>{
  //         const title = product.title.en.toLowerCase();
  //         const searchWord = this.searchWord.toLowerCase();
  //         return title.includes(searchWord);
  //       })
        
  //       console.log(products,"products")
  //     },
  //     error: (error) => console.log(error),
  //   });
  // }

  getAllProducts() {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);
    this.productService.GetAllProducts(this.user.token).subscribe({
      next: (data: any) => {
        const filteredProducts = data.filter((product: any) => {
          const title = product.title.en.toLowerCase();
          const searchWord = this.searchWord.toLowerCase();
          return title.includes(searchWord);
        });

        this.products = filteredProducts; // Assign filtered products to the products array
        console.log(filteredProducts, "filtered products");
      },
      error: (error) => console.log(error),
    });
  }

  ngOnInit(): void {
    
     this.route.queryParams.subscribe(params => {
      this.searchWord = params['search'];
     if( this.searchWord) this.getAllProducts();
      console.log('search:', this.searchWord);
    });
  }

}
