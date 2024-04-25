import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  editform: boolean = false;

  EditProfile = new FormGroup({
    username: new FormControl("", [Validators.minLength(3), Validators.maxLength(50), Validators.required]),
    email: new FormControl("", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),//check on it Validators.email
    password: new FormControl("", [Validators.minLength(6), Validators.required]),
    gender: new FormControl("", [Validators.required]),

  })

  getdata() {

    console.log(this.EditProfile.controls.username.valid);
    console.log(this.EditProfile.controls.email.valid);
    console.log(this.EditProfile.controls.password.valid);
    console.log(this.EditProfile.controls.gender.valid);
    let username = this.EditProfile.controls.username.value;
    let email = this.EditProfile.controls.email.value;
    let password = this.EditProfile.controls.password.value;
    let gender = this.EditProfile.controls.gender.value;

    console.log(`username: ${username} , email: ${email} , password: ${password}, gender: ${gender}`);


    // data as an object
    console.log(this.EditProfile.value);
 

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
 





}
