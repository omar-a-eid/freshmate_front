import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';
import { RegistrationService } from '../../services/registration/registration.service';
import { TranslationService } from '../../services/translation/translation.service';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PathbarComponent } from '../pathbar/pathbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, FooterComponent, PathbarComponent, NavbarComponent, RouterModule],
  providers: [CartService,RegistrationService, OrderService, TranslationService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  userSession: any
  StatusOfProduct: any
  productPrice: any
  orders: any
  user: any
  sum: any
  collect: any
  totalPrice: any;
  productQuantity: any;
  UserEmail:any
  lang:string = "en";
  ltr:boolean= false;

  constructor(private cartService: CartService,private registrationService:RegistrationService, private orderService: OrderService, private langService: TranslationService, private router: Router) { 
    this.lang = this.langService.lang();
    this.ltr = this.langService.isAr();
  }
  ngOnInit(): void {
    this.userSession = sessionStorage.getItem("user");
    this.user = JSON.parse(this.userSession);

    this.cartService.GetCartItems(this.user.token).subscribe({
      next: (data: any) => {
        if (data.products.length > 0) {
          this.orders = data; // Assuming the first order in the array
        }
        // const singledata = data[];
        // console.log(data);

        //#region handle backend

        // this.productImage = data[0].products[0].product.images[0];//image
        // console.log(this.productPrice = data[0].products[0].product.price);
        // this.productTitle = data[0].products[0].product.title.en;//title
        // this.totalPrice = data[0].totalPrice;
        // this.totalPrice = data[0].products[1].quantity;
        // this.productStatus = data[0].status.en;

        // console.log(data[0].products[1]);

        // this.productPrice = data[0].products[0].product.price;
        // this.productQuantity = data[0].products[0].quantity;
        // this.totalPrice = (this.productPrice * this.productQuantity);
        //#endregion
        // to get the total price of an order
        this.totalPrice = 0
        for (let i = 0; i < this.orders.products.length; i++) {

          this.productPrice = this.orders.products[i].product.price;
          this.productQuantity = this.orders.products[i].quantity;
          this.totalPrice += (this.productPrice * this.productQuantity);

        }

      },
      error: (err) => { "there is an eror fetching data from mongodb" }
      // complete:()=>{}
    })

    this.registrationService.getUsersById(this.user.userId, this.user.token).subscribe({
      next: (data: any) => {
        this.orders = data;
      

        this.UserEmail = data.email;

        //#region handle backend

        // console.log(data.email);
        // console.log(data.username);
        // console.log(data.gender.en);
        //#endregion

      },
      error: (err) => { "there is an eror fetching data from mongodb" }
    })
  }

  logout: boolean = false

  signout(){
    this.registrationService.signout()
    this.router.navigate([this.router.url]);
  }

  Checkout = new FormGroup({
    country: new FormControl("", [Validators.required]),
    firstname: new FormControl("", [Validators.minLength(3), Validators.maxLength(15), Validators.required]),
    lastname: new FormControl("", [Validators.minLength(3), Validators.maxLength(15), Validators.required]),
    address: new FormControl("", [Validators.minLength(10), Validators.maxLength(50), Validators.required]),
    appartment: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    zipcode: new FormControl("", [Validators.required]),
    cardnumber: new FormControl("", [Validators.pattern("[0-9 ]{16}"), Validators.required]),
    expiredate: new FormControl("", [Validators.required]),
    securitycode: new FormControl("", [Validators.required]),
    nameoncard: new FormControl("", [Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.minLength(5), Validators.maxLength(15), Validators.required]),
    billaddress: new FormControl("", [Validators.required]),
  })

  getdata() {

    //#region handling tests
    // console.log(this.Checkout.controls.country.valid);
    // console.log(this.Checkout.controls.firstname.valid);
    // console.log(this.Checkout.controls.lastname.valid);
    // console.log(this.Checkout.controls.address.valid);
    // console.log(this.Checkout.controls.appartment.valid);
    // console.log(this.Checkout.controls.city.valid);
    // console.log(this.Checkout.controls.state.valid);
    // console.log(this.Checkout.controls.zipcode.valid);
    // console.log(this.Checkout.controls.cardnumber.valid);
    // console.log(this.Checkout.controls.expiredate.valid);
    // console.log(this.Checkout.controls.securitycode.valid);
    // console.log(this.Checkout.controls.nameoncard.valid);
    // console.log(this.Checkout.controls.billaddress.valid);

//#endregion

    let country = this.Checkout.controls.country.value;
    let firstname = this.Checkout.controls.firstname.value;
    let lastname = this.Checkout.controls.lastname.value;
    let address = this.Checkout.controls.address.value;
    let appartment = this.Checkout.controls.appartment.value;
    let city = this.Checkout.controls.city.value;
    let state = this.Checkout.controls.state.value;
    let zipcode = this.Checkout.controls.zipcode.value;
    let cardnumber = this.Checkout.controls.cardnumber.value;
    let expiredate = this.Checkout.controls.expiredate.value;
    let securitycode = this.Checkout.controls.securitycode.value;
    let nameoncard = this.Checkout.controls.nameoncard.value;
    let billaddress = this.Checkout.controls.billaddress.value;


  
    
    this.cartService.GetCartItems(this.user.token).subscribe({
      next: (data: any) => {
        const order = data;
       const products = [];
        let totalPrice = 0, productPrice, productQuantity;
        for (let i = 0; i < order.products.length; i++) {
          productPrice = order.products[i].product.price;
          productQuantity = order.products[i].quantity;
          totalPrice += (productPrice * productQuantity);
        }
        delete order["_id"];
        order.totalPrice = totalPrice.toFixed(2);
        order.status = "pending";
        // console.log(order);
        this.orderService.CreateOrder(order, this.user.token).subscribe({
          next: ()=> {
            this.showToast();
          },
          error(err) {
              
          },
        });
      },
      error: (err) => { "there is an eror fetching data from mongodb" }
    })

  }

  get country(): FormControl {
    return this.Checkout.get("country") as FormControl;
  }

  get firstname(): FormControl {
    return this.Checkout.get("firstname") as FormControl;
  }

  get lastname(): FormControl {
    return this.Checkout.get("lastname") as FormControl;
  }

  get address(): FormControl {
    return this.Checkout.get("address") as FormControl;
  }

  get appartment(): FormControl {
    return this.Checkout.get("appartment") as FormControl;
  }

  get city(): FormControl {
    return this.Checkout.get("city") as FormControl;
  }

  get state(): FormControl {
    return this.Checkout.get("state") as FormControl;
  }

  get zipcode(): FormControl {
    return this.Checkout.get("zipcode") as FormControl;
  }

  get cardnumber(): FormControl {
    return this.Checkout.get("cardnumber") as FormControl;
  }

  get expiredate(): FormControl {
    return this.Checkout.get("expiredate") as FormControl;
  }

  get securitycode(): FormControl {
    return this.Checkout.get("securitycode") as FormControl;
  }

  get nameoncard(): FormControl {
    return this.Checkout.get("nameoncard") as FormControl;
  }

  get billaddress(): FormControl {
    return this.Checkout.get("billaddress") as FormControl;
  }

  showToast() {
    const passwordToast = document.getElementById('passwordToast');
    if (!passwordToast) return;

    const toastBody = passwordToast.querySelector('.toast-body');
    if (!toastBody) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    passwordToast.style.display = "block";
    passwordToast.classList.add('show');

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const topPosition = Math.max(20, scrollY + 20);

    passwordToast.style.top = topPosition + 'px';

    setTimeout(() => {
      passwordToast.classList.remove('show');
      passwordToast.style.display = "none";
    }, 8000);

    const closeToast = document.querySelector('[data-dismiss="toast"]');
    if (closeToast) {
      closeToast.addEventListener("click", () => {
        passwordToast.style.display = "none";
      });
    }
  }

}
