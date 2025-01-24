import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserReturnDTO } from '../interface/usuario';
import { OrderReturnDTO } from '../interface/order';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  private baseUrl = 'http://localhost:5050/';
  private loginUrl = 'users/'
  private orderUrl = 'orders/'

  constructor(private _http: HttpClient) { }

  addGuestUser() : Observable<UserReturnDTO>{
    return this._http.post<UserReturnDTO>(`${this.baseUrl}${this.loginUrl}addGuest`, {}).pipe(
      catchError((error) => {
        console.error('Error creating guest user', error);
        return throwError(() => new Error('Failed to create guest user'));
      })
    );
  }

  addOrder(usuario: UserReturnDTO): Observable<OrderReturnDTO> {
    console.warn(usuario);
    return this._http.post<OrderReturnDTO>(`${this.baseUrl}${this.orderUrl}addOrder`,usuario ).pipe(
      catchError((error) => {
        console.error('Error creating order', error);
        return throwError(() => new Error('Failed to create order'));
      })
    );
  }


}
