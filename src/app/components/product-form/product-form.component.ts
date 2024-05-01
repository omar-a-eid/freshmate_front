import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule,ReactiveFormsModule],
  providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  productForm = new FormGroup({
    title: new FormControl({
      en: ['', Validators.required],
      ar: ['', Validators.required]
    }),
    desc: new FormControl({
      en: ['', Validators.required],
      ar: ['', Validators.required]
    }),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    images: new FormControl([[], Validators.required])

  })

  product : any = {
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
  formData = new FormData();
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.isEditMode = true;
        // Fetch product details by ID and populate form fields for editing
        this.productService.GetProduct(this.productId).subscribe({
          next:(data) => {
            this.product = data;
            console.log(data);
            
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
    const user = JSON.parse(sessionStorage.getItem("user") as string)
    console.log(this.product);
    
    if (this.isEditMode) {
      // Call service method to update the existing product
      this.productService.updateProduct(this.productId, this.product,user.token).subscribe({
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
      this.productService.addProduct(this.formData,user.token).subscribe({
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
    const user = JSON.parse(sessionStorage.getItem("user") as string)
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.productId,user.token).subscribe({
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
    const files = event.target.files;
    if (files.length > 0) {
    for (let i = 0; i < Math.min(files.length, 5); i++) {
      this.formData.append('images', files[i]);
    }
  }
  }
}
