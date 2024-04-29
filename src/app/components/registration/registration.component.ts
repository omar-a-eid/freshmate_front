import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration/registration.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [RegistrationService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  
  constructor(private registrationService: RegistrationService) {}
  errMessage:any;
  loginData = new FormGroup({
    email: new FormControl("", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
    password: new FormControl("", [Validators.minLength(6), Validators.required]),
  })

  signupData = new FormGroup({
    username: new FormControl("", [Validators.minLength(3), Validators.required]),
    gender: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
    password: new FormControl("", [Validators.minLength(6), Validators.required]),
  })

  login() {
    if(this.loginData.valid) {
      const user = this.loginData.value;
      this.registrationService.login(user).subscribe({
        error: error => this.errMessage = error.error,
        next: (data:any) => {
          sessionStorage.setItem("user",JSON.stringify(data));
        }
      })
    }
  }

  signup() {
    if(this.signupData.value) {
      const newUser = this.signupData.value;
      this.registrationService.signup(newUser).subscribe({
        error: error => this.errMessage = error.error,
        next: (data:any) => {
          console.log(data);
        }
      });
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
}
