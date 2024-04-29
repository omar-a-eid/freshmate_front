import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FooterComponent,PathbarComponent,NavbarComponent],
  providers:[OrderService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  // userid:Number | undefined;
  StatusOfProduct:any
  productimage:any
  orders:any
  constructor(private order:OrderService){}
  ngOnInit(): void {
    // this.order.GetAllOrders().subscribe({
    //   next:(data)=>{
    //     this.orders = data;
    //     // const singledata = data[];
    //     this.StatusOfProduct = this.orders[0]["status"].en;
    //     console.log(this.StatusOfProduct);
    //   },
    //   error:(err)=>{"there is an eror fetching data from mongodb"} 
    //   // complete:()=>{}
    // })
    // this.order.GetAllOrdersForUser(this.userid).subscribe({
    //   next:(data)=>{
    //     // this.orders = data;
    //     console.log(data);
        
    //   },
    //   error:(err)=>{"there is an eror fetching data from mongodb"} 
    //   // complete:()=>{}
    // })
    // this.order.GetAllOrdersForUser()
  }

  logout: boolean = false



  Checkout = new FormGroup({
    country: new FormControl("", [Validators.required]),
    firstname: new FormControl("", [Validators.minLength(5), Validators.maxLength(15), Validators.required]),
    lastname: new FormControl("", [Validators.minLength(5), Validators.maxLength(15), Validators.required]),
    address: new FormControl("", [Validators.minLength(10), Validators.maxLength(50), Validators.required]),
    appartment: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    zipcode: new FormControl("", [Validators.required]),
    cardnumber: new FormControl("", [Validators.pattern("[0-9 ]{16}"), Validators.required]),
    expiredate: new FormControl("", [Validators.required]),
    securitycode: new FormControl("", [Validators.required]),
    nameoncard: new FormControl("", [Validators.pattern("[a-zA-Z][a-zA-Z ]+"),Validators.minLength(5),Validators.maxLength(15), Validators.required]),
    billaddress: new FormControl("", [Validators.required]),
  })

  getdata() {

    console.log(this.Checkout.controls.country.valid);
    console.log(this.Checkout.controls.firstname.valid);
    console.log(this.Checkout.controls.lastname.valid);
    console.log(this.Checkout.controls.address.valid);
    console.log(this.Checkout.controls.appartment.valid);
    console.log(this.Checkout.controls.city.valid);
    console.log(this.Checkout.controls.state.valid);
    console.log(this.Checkout.controls.zipcode.valid);
    console.log(this.Checkout.controls.cardnumber.valid);
    console.log(this.Checkout.controls.expiredate.valid);
    console.log(this.Checkout.controls.securitycode.valid);
    console.log(this.Checkout.controls.nameoncard.valid);
    console.log(this.Checkout.controls.billaddress.valid);



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
  

    console.log(`country: ${country} , firstname: ${firstname}, lastname: ${lastname}, address: ${address}, appartment: ${appartment}, city: ${city}, state: ${state}, zipcode: ${zipcode}, cardnumber: ${cardnumber}, expiredate: ${expiredate}, securitycode: ${securitycode}, nameoncard: ${nameoncard}, billaddress: ${billaddress},`);

    // data as an object
    console.log(this.Checkout.value);

    alert("Order has been Send we will contact you on your email thank you for ordering.")

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

  get billaddress (): FormControl {
    return this.Checkout.get("billaddress") as FormControl;
  }

  

}
