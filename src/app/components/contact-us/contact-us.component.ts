import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NavbarComponent,PathbarComponent,FooterComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUSComponent {


  ContactUs = new FormGroup({
    name: new FormControl("", [Validators.minLength(3), Validators.maxLength(50), Validators.required]),
    email: new FormControl("", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),//check on it Validators.email
    phonenumber: new FormControl("", [Validators.pattern("[0-9 ]{11}"), Validators.required]),
    description: new FormControl("", [Validators.minLength(10), Validators.maxLength(100),Validators.required]),

  })

  getdata() {

    // console.log(this.ContactUs.controls.name.valid);
    // console.log(this.ContactUs.controls.email.valid);
    // console.log(this.ContactUs.controls.phonenumber.valid);
    // console.log(this.ContactUs.controls.description.valid);
    let name = this.ContactUs.controls.name.value;
    let email = this.ContactUs.controls.email.value;
    let phonenumber = this.ContactUs.controls.phonenumber.value;
    let description = this.ContactUs.controls.description.value;

    // console.log(`name: ${name} , email: ${email} , phonenumber: ${phonenumber}, description: ${description}`);


    // data as an object
    // console.log(this.ContactUs.value);
    
    // alert("Thank you for your Coperation Email has been Send to the Support team");
    this.showToast();

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


  get name(): FormControl {
    return this.ContactUs.get("name") as FormControl;
  }

  get Email(): FormControl {
    return this.ContactUs.get("email") as FormControl;
  }

  get phonenumber(): FormControl {
    return this.ContactUs.get("phonenumber") as FormControl;
  }

  get description(): FormControl {
    return this.ContactUs.get("description") as FormControl;
  }
}
