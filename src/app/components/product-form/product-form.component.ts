import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule,ReactiveFormsModule],
  providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  productForm:any = new FormGroup({
    titleEn: new FormControl("", [Validators.required, Validators.minLength(5),Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]),
    titleAr: new FormControl("", [Validators.required, Validators.minLength(5),Validators.maxLength(20),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]),
    descEn: new FormControl("", [Validators.required, Validators.minLength(10),Validators.maxLength(50),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]),
    descAr: new FormControl("", [Validators.required, Validators.minLength(10),Validators.maxLength(50),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    images: new FormControl([],[Validators.required, Validators.minLength(2)]),
    oldImages: new FormControl(null),

  })


  isEditMode = false;
  productId: any;
  message: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.isEditMode = true;
        this.productService.GetProduct(this.productId).subscribe({
          next:(data:any) => {
            this.productForm.patchValue({
              titleEn: data.title.en,
              titleAr: data.title.ar,
              descEn: data.desc.en,
              descAr: data.desc.ar,
              price: data.price,
              quantity: data.quantity,
              oldImages:  data.images
            });
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
    if(this.productForm.valid) {
      const user = JSON.parse(sessionStorage.getItem("user") as string)
      const productData = this.productForm.value;
      const formData = new FormData();
  
      formData.append('title[en]', productData.titleEn);
      formData.append('title[ar]', productData.titleAr);
      formData.append('desc[en]', productData.descEn);
      formData.append('desc[ar]', productData.descAr);
      formData.append('price', productData.price);
      formData.append('quantity', productData.quantity);
      
      const images = this.productForm.get('images').value;
      if(images){
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }
  
      if (this.isEditMode) {
        formData.append("oldImages", productData.oldImages);
        // console.log(formData);
        this.productService.updateProduct(this.productId, formData,user.token).subscribe({
          next: (data) => {
            this.message = 'Product updated successfully';
            // console.log(data)
          },
          error: (error) => {
            this.message = 'Error updating product';
          }
        });
      } else {
        // Call service method to add a new product
        this.productService.addProduct(formData, user.token).subscribe({
          next: (response) => {
            this.message = 'Product added successfully';
          },
          error: (error) => {
            this.message = 'Error adding product';
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.productForm);
    }
  }

  get titleEn(): FormControl {
    return this.productForm.get("titleEn") as FormControl;
  }

  get titleAr(): FormControl {
    return this.productForm.get("titleAr") as FormControl;
  }

  get descEn(): FormControl {
    return this.productForm.get("descEn") as FormControl;
  }

  get descAr(): FormControl {
    return this.productForm.get("descAr") as FormControl;
  }

  get price(): FormControl {
    return this.productForm.get("price") as FormControl;
  }

  get quantity(): FormControl {
    return this.productForm.get("quantity") as FormControl;
  }

  get images(): FormControl {
    return this.productForm.get("images") as FormControl;
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
      this.productForm.get('images').setValue(files);
    }
  }

  deleteImage(img: any) {
    const oldImages = this.productForm.get('oldImages').value;
    const updatedOldImages = oldImages.filter((oldImg: any) => oldImg !== img);
    this.productForm.get('oldImages').setValue(updatedOldImages);
  }
  
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control instanceof FormGroup) {
            this.markFormGroupTouched(control);
        }
    });
  }
}
