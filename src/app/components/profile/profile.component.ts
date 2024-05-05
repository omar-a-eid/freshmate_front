import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { OrderService } from '../../services/order/order.service';
import { RegistrationService } from '../../services/registration/registration.service';
import { TranslationService } from '../../services/translation/translation.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  providers: [RegistrationService,OrderService, AuthService, TranslationService, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private registrationService: RegistrationService, private orderservice: OrderService, private isAuth: AuthService, private langService: TranslationService, private router: Router ) {
      this.lang = this.langService.lang();
      this.ltr = this.langService.isAr();
   }

  loading: boolean = true;

  editform: boolean = false;
  userSession: any
  user:any
  orders:any
  order:any
  userId:any
  editedUser: any;
  UserEmail:any
  UserUsername:any
  UserGender:any
  avatar: any;
  isAdmin: boolean = false;
  lang:string = "en";
  ltr:boolean= false;

  EditProfile:any = new FormGroup({
    username: new FormControl("", [Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl("", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", [Validators.minLength(6)]),
    gender: new FormControl("" ),
    avatar: new FormControl(null)

  })

  getdata() {

    // console.log(this.EditProfile.controls.username.valid);
    // console.log(this.EditProfile.controls.email.valid);
    // console.log(this.EditProfile.controls.password.valid);
    // console.log(this.EditProfile.controls.gender.valid);
    let username = this.EditProfile.controls.username.value;
    let email = this.EditProfile.controls.email.value;
    let password = this.EditProfile.controls.password.value;
    let gender = this.EditProfile.controls.gender.value;
    let avatar = this.EditProfile.controls.avatar.value;


    // console.log(`username: ${username} , email: ${email} , password: ${password}, gender: ${gender}`);


    // data as an object
    this.editedUser = {
      username: username,
      email: email,
      password: password,
      gender: gender,
      avatar: avatar
  };

    // console.log(this.editedUser);
  }
  
  update() { 
      
      if(this.EditProfile.valid) {
        const updateUser:any = this.EditProfile.value;
        const formData = new FormData();
        Object.keys(updateUser).forEach(key => {
          formData.append(key, updateUser[key]);
        });

      this.registrationService.update(this.user.userId, this.user.token,formData).subscribe({//here we should add the userid
        error: error => console.log(error),
        next: (data:any) => {
          // console.log(this.editedUser);
          // console.log(data);
          // alert("profile updated Successfully")
          this.showToast();

        }
      });
  }
  }
  

  
  ngOnInit(): void {
    this.userSession = sessionStorage.getItem("user");
    this.user = JSON.parse(this.userSession);
    // console.log(this.user.token);
    this.isAdmin =  this.isAuth.isAdmin();
    this.registrationService.getUsersById(this.user.userId, this.user.token).subscribe({
      next: (data: any) => {
        this.UserEmail = data.email;
        this.UserUsername = data.username;
        this.UserGender = data.gender[this.lang];
        this.avatar = data.avatar;
        this.loading = false;

      },
      error: (err) => {
        console.error("there is an error fetching data from mongodb", err);
        this.loading = false;
      }
    })


    this.orderservice.GetAllOrdersForUser(this.user.userId, this.user.token).subscribe({
      next: (data: any) => {
        this.orders = data;
      
        
        //#region handle backend

        // const singledata = data[];
        // console.log(data.length);
        // console.log(data[0].date); //date of the order
        // console.log(data[0].totalPrice);// totalprice of the order
        // console.log(data[0].products.length);//2 products

        

        //#endregion

      },
      error: (err) => { "there is an eror fetching data from mongodb" }
    })


    

  }


  get Username(): FormControl {
    return this.EditProfile.get("username") as FormControl;
  }

  get Email(): FormControl {
    return this.EditProfile.get("email") as FormControl;
  }


  get Password(): FormControl {
    return this.EditProfile.get("password") as FormControl;
  }


  get gender(): FormControl {
    return this.EditProfile.get("gender") as FormControl;
  }
 


  signout(){
    this.registrationService.signout()
    this.router.navigate(['/']);
  }


  onPhotoChange(event: any) {
    this.EditProfile.get('avatar').setValue(event.target.files[0]);

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

  deleteOrder(orderId:string) {
    this.userSession = sessionStorage.getItem("user");
    this.user = JSON.parse(this.userSession);
    this.orderservice.DeleteOrder(orderId, this.user.token).subscribe({
      next: () => {
        this.router.navigate([this.router.url])
      },
      error(err) {
          
      },
    })
  }
}
