import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHeader } from '../models/orderHeader.model';
import { OrderProduct } from '../models/orderProduct.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderData = {
    country: '',
    city: '',
    address: '',
    phone: '',
    paymentMethod: '',
  };

  constructor(private http: HttpClient) { }

  makeOrder() {
    return this.http.post('https://localhost:7159/api/order',
      this.orderData,
      { responseType: 'text' }
    )
  }

  getAllOrder() {
    return this.http.get<OrderHeader[]>('https://localhost:7159/api/order')
  }

  getOrderDetails(orderId: string) {
    return this.http.get<OrderProduct[]>(`https://localhost:7159/api/Order/orderDetails/${orderId}`)
  }

}
