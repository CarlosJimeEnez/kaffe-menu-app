import { Injectable } from '@angular/core';
import { UserWithOrderAndOrderDetail } from '../interface/userWithOrderAndOrderDetail';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItems: UserWithOrderAndOrderDetail[] = [];
  constructor() { }

  addItem(item: UserWithOrderAndOrderDetail) {
    this.cartItems.push(item);
  }

  getItems() {
    return this.cartItems;
  }
}
