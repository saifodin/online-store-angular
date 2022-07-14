import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderProduct } from 'src/app/models/orderProduct.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderProduct[] = [];

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.onFetchOrderData(params['orderId']);
    })
  }

  onFetchOrderData(orderId: string) {
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (value) => {
        this.orderDetails = value
        console.log(value)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
