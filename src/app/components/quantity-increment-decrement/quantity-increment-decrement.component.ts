import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quantity-increment-decrement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantity-increment-decrement.component.html',
  styleUrl: './quantity-increment-decrement.component.css'
})
export class QuantityIncrementDecrementComponent {
@Input() max:any;

  data: number = 0;

  increment() {
    if(this.data != this.max) {
      this.data = this.data + 1;
    }
  }
  
  decrement() {
    if(this.data==0) {
      this.data =0;
    }else{
      this.data = this.data - 1;
    }
  }

}
