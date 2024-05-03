import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistrationService } from '../../services/registration/registration.service';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
  providers: [RegistrationService, TranslationService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  @ViewChild('closeButton') closeButton!: ElementRef;
  @Output() isLoggedin = new EventEmitter<boolean>();

  constructor(private registrationService: RegistrationService, private router: Router, private langService: TranslationService) {
    this.lang = this.langService.lang();
    this.ltr = this.langService.isAr();
  }
  toggle:boolean= false;
  position:string = "loginBtn";
  errMessageLogin:any;
  errMessageSignup:any;
  avatar:any;
  lang:string = "en";
  ltr:boolean= false;

  loginData = new FormGroup({
    email: new FormControl("", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
    password: new FormControl("", [Validators.minLength(6), Validators.required]),
  })

  signupData:any = new FormGroup({
    username: new FormControl("", [Validators.minLength(3), Validators.required]),
    gender: new FormControl("male", [Validators.required]),
    email: new FormControl("", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
    password: new FormControl("", [Validators.minLength(6), Validators.required]),
    avatar: new FormControl(null, [Validators.required])
  })

  login() {
    if(this.loginData.valid) {
      const user = this.loginData.value;
      this.registrationService.login(user).subscribe({
        error: error => this.errMessageLogin = error.error,
        next: (data:any) => {
          sessionStorage.setItem("user",JSON.stringify(data));
          this.isLoggedin.emit(true);
        },
        complete: () => {
          this.closeButton.nativeElement.click();
          if(this.loginData.value.email == "admin@gmail.com") {
           this.router.navigate(['/dashboard']);
          } else {
           this.router.navigate(['/products']);
          }
        }
      })
    }
  }

  signup() {
    if(this.signupData.value) {
      const newUser = this.signupData.value;
      const formData = new FormData();

    Object.keys(newUser).forEach(key => {
      formData.append(key, newUser[key]);
    });
      this.registrationService.signup(formData).subscribe({
        error: error => this.errMessageSignup = error.error,
        next: (data:any) => {
          sessionStorage.setItem("user",JSON.stringify(data));
        },
        complete: () => {
          this.closeButton.nativeElement.click();
          this.router.navigate(['/products']);
        }
      });
    }
  }

  handleToggle(e:any, state:string) {
    if(e.target.id != this.position) {
      this.toggle = !this.toggle;
      this.position = state;
    }
  }
  get Email(): FormControl {
    return this.loginData.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginData.get("password") as FormControl;
  }

  get EmailSignup(): FormControl {
    return this.signupData.get("email") as FormControl;
  }
  get PasswordSignup(): FormControl {
    return this.signupData.get("password") as FormControl;
  }

  get Username(): FormControl {
    return this.signupData.get("username") as FormControl;
  }

  get Gender(): FormControl {
    return this.signupData.get("gender") as FormControl;
  }
  
  get Avatar(): FormControl {
    return this.signupData.get("avatar") as FormControl;
  }

  onFileChange(event: any) {
    this.signupData.get('avatar').setValue(event.target.files[0]);
  }
}
