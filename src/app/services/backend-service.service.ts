import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserReturnDTO } from '../interface/usuario';
import { OrderReturnDTO } from '../interface/order';
import { CoffeeReturnDTO } from '../interface/coffes';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  private baseUrl = 'http://localhost:5050/';
  private loginUrl = 'users/'
  private orderUrl = 'orders/'
  private productUrl = 'products/'

  constructor(private _http: HttpClient) { }

  getProductsByCategory(category: string) : Observable<CoffeeReturnDTO[]> {
    return this._http.get<CoffeeReturnDTO[]>(`${this.baseUrl}${this.productUrl}${category}`).pipe(
      catchError((error) => {
        console.error('Error getting products list', error);
        return throwError(() => new Error('Failed to get products list'));
      })
    );
  }

  //Crea un usuario invitado
  addGuestUser() : Observable<UserReturnDTO>{
    return this._http.post<UserReturnDTO>(`${this.baseUrl}${this.loginUrl}addGuest`, {}).pipe(
      catchError((error) => {
        console.error('Error creating guest user', error);
        return throwError(() => new Error('Failed to create guest user'));
      })
    );
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


}
