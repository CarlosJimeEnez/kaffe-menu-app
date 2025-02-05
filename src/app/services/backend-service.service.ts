import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserReturnDTO } from '../interface/usuario';
import { OrderReturnDTO } from '../interface/order';
import { CoffeeReturnDTO } from '../interface/coffes';
import { OrdersDetailsInsertDTO, OrdersDetailsReturnDTO } from '../interface/ordersDetails';
import { UserWithOrderAndOrderDetail } from '../interface/userWithOrderAndOrderDetail';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  private baseUrl = 'http://localhost:5050/';
  private loginUrl = 'users/'
  private orderUrl = 'orders/'
  private productUrl = 'products/'
  private orderDetailsUrl = 'ordersDetails/'
  private sizeUrl = 'sizes/'
  private cartDetailsUrl = 'cartDetails/'
  constructor(private _http: HttpClient) { }


  //Get id size by name: 
  getIdSizeByName(name: string) : Observable<number> {
    return this._http.get<number>(`${this.baseUrl}${this.sizeUrl}getIdByName`, {
      params: {
        sizeName: name
      }
    });
  }

  //Obtiene una lista de cafes por categoria    
  getProductsByCategory(category: string) : Observable<CoffeeReturnDTO[]> {
    return this._http.get<CoffeeReturnDTO[]>(`${this.baseUrl}${this.productUrl}${category}`).pipe(
      catchError((error) => {
        console.error('Error getting products list', error);
        return throwError(() => new Error('Failed to get products list'));
      })
    );
  }

  getProductsById(id: number) : Observable<CoffeeReturnDTO> {
    return this._http.get<CoffeeReturnDTO>(`${this.baseUrl}${this.productUrl}${id}`)
  }

  //Crea un usuario invitado
  addGuestUser() : Observable<UserReturnDTO>{
    return this._http.post<UserReturnDTO>(`${this.baseUrl}${this.loginUrl}addGuest`, {})
  }

  //Crea un orden para un usuario
  addOrder(user: UserReturnDTO): Observable<OrderReturnDTO> {
    const userId = user.Id;
    return this._http.post<OrderReturnDTO>(`${this.baseUrl}${this.orderUrl}addOrder`, userId).pipe(
      catchError((error) => {
        console.error('Error creating order', error);
        return throwError(() => new Error('Failed to create order'));
      })
    );
  }

  addOrderDetails(orderDetails: OrdersDetailsInsertDTO): Observable<OrdersDetailsReturnDTO> {
    return this._http.post<OrdersDetailsReturnDTO>(`${this.baseUrl}${this.orderDetailsUrl}addOrderDetails`, orderDetails)
  }

  addPurchase(userWithOrderAndOrderDetail: UserWithOrderAndOrderDetail[]):Observable<UserWithOrderAndOrderDetail[]>{
    return this._http.post<UserWithOrderAndOrderDetail[]>(`${this.baseUrl}${this.cartDetailsUrl}addCartDetails`, userWithOrderAndOrderDetail)
  }

}
