import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  product = {
    title: {
      en: '',
      ar: ''  
    },
    desc: {
      en: '', 
      ar: ''  
    },
    price: 0,
    images: null,
    quantity : 0
  };
  isEditMode = false;
  productId: any;
  message: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.isEditMode = true;
        // Fetch product details by ID and populate form fields for editing
        this.productService.getProductById(this.productId).subscribe({
          next:(data) => {
            this.product = data;
          },
          error:(error) => {
            console.error('Error fetching product details', error);
          }
        }
        );
      }
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      // Call service method to update the existing product
      this.productService.updateProduct(this.productId, this.product).subscribe({
        next: (data) => {
          this.message = 'Product updated successfully';
          console.log(data)
        },
        error: (error) => {
          this.message = 'Error updating product';
        }
      });
    } else {
      // Call service method to add a new product
      this.productService.addProduct(this.product).subscribe({
        next: (response) => {
          this.message = 'Product added successfully';
        },
        error: (error) => {
          this.message = 'Error adding product';
        }
      });
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.productId).subscribe({
        next: (response) => {
          this.message = 'Product deleted successfully';
        },
        error: (error) => {
          this.message = 'Error deleting product';
        }
      });
    }
  }

  onFileChange(event: any) {
    // Handle file upload and set product image
    const file = event.target.files[0];
    this.product.images = file;
  }
}
