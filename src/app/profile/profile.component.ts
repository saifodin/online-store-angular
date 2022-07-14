import { Component, OnInit } from '@angular/core';
import { OrderHeader } from '../models/orderHeader.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  allOrderHeader: OrderHeader[] = []

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrdersHeader();
  }

  getAllOrdersHeader() {
    this.orderService.getAllOrder().subscribe({
      next: (value) => {
        this.allOrderHeader = value;
      }
    })
  }

  



}
