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

  }

  get Email(): FormControl {
    return this.loginData.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginData.get("password") as FormControl;
  }
}
