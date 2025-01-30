import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItems: any[] = [];
  constructor() { }

  addItem(item: any) {
    this.cartItems.push(item);
  }

  getItems() {
    return this.cartItems;
  }
}
