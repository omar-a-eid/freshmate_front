import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { OrderService } from '../../services/order/order.service';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CanvasJSAngularChartsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [OrderService, TranslationService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: any;
  pending = 0;
  accepted = 0;
  rejected = 0;
  lang = 'en';
  status = new FormGroup({
    status: new FormControl('', Validators.required),
  });
  constructor(
    private orderService: OrderService,
    private langService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lang = this.langService.lang();
    const user = JSON.parse(sessionStorage.getItem('user') as string);
    if (user) {
      this.orderService.GetAllOrders(user.token).subscribe({
        next: (data) => {
          this.orders = data;
          this.orders.forEach((order: any) => {
            switch (order.status.en) {
              case 'pending':
                this.pending++;
                break;
              case 'rejected':
                this.rejected++;
                break;
              case 'accepted':
                this.accepted++;
                break;
              default:
                // handle unexpected status
                break;
            }
          });
          this.updateChart();
        },
        error: (err) => console.log(err),
      });
    }
  }

  chartOptions = {
    animationEnabled: true,
    title: {
      text: 'Orders Status',
    },
    data: [
      {
        type: 'doughnut',
        yValueFormatString: "#,###.##'%'",
        indexLabel: '{name}',
        dataPoints: [
          { y: this.pending, name: 'Pending' },
          { y: this.rejected, name: 'Rejected' },
          { y: this.accepted, name: 'Accepted' },
        ],
      },
    ],
  };

  updateChart() {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: 'Orders Status',
      },
      data: [
        {
          type: 'doughnut',
          yValueFormatString: "#,###.##'%'",
          indexLabel: '{name}',
          dataPoints: [
            { y: this.pending, name: 'Pending' },
            { y: this.rejected, name: 'Rejected' },
            { y: this.accepted, name: 'Accepted' },
          ],
        },
      ],
    };
  }

  update(orderId: any) {
    if (this.status.valid) {
      const user = JSON.parse(sessionStorage.getItem('user') as string);
      this.orderService
        .UpdateOrder(orderId, this.status.value, user.token)
        .subscribe({
          next: () => {
            this.router.navigate([this.router.url]);
          },
          error(err) {
            console.log(err);
          },
          complete() {
          },
        });
    }
  }
}
