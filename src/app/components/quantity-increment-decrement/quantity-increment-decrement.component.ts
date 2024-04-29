import { Component } from '@angular/core';

@Component({
  selector: 'app-quantity-increment-decrement',
  standalone: true,
  imports: [],
  templateUrl: './quantity-increment-decrement.component.html',
  styleUrl: './quantity-increment-decrement.component.css'
})
export class QuantityIncrementDecrementComponent {

  data: number = 0;

  increment() {
    this.data = this.data + 1;
  }
  
  decrement() {
    if(this.data==0) {
      this.data =0;
    }else{
      this.data = this.data - 1;
    }
  }

}
