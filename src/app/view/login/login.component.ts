import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServiceService } from '../../services/backend-service.service';
import { UserReturnDTO } from '../../interface/usuario';
import { Observable, switchMap, map, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <section>
      <div class="bg-gray-100 h-[60vh]">
        
      </div>
      
    </section>
    <section>
    <div class="grid grid-cols-12 gap-7 mx-10 py-11 2xl:mx-72 2xl:py-20">
        <button (click)="navigateToMenu()" class="bg-primary-950 col-span-8 w-full text-white rounded-md hover:shadow-2xl hover:-translate-y-1 hover:shadow-primary-950/50 transition-shadow duration-300">
        
        <h3 class="text-xl font-semibold">
            Ordenar 
          </h3>
       
        </button>
        <button class="bg-primary-100 col-span-4 w-full text-text p-3 rounded-md">
          <h3 class="text-xl font-semibold">Ingresar</h3>
        </button>
      </div>
    </section>
  `,
  styles: ``
})

export class LoginComponent {
  router = inject(Router);
  backendService = inject(BackendServiceService);
  combinedData$!: Observable<any | null>;

  user$!: UserReturnDTO | null;

  constructor() { }

  //Crea un usuario invitado
  navigateToMenu() {
    this.combinedData$ = this.backendService.addGuestUser().pipe(
      switchMap(user => this.backendService.addOrder(user).pipe(
        map(order => ({ user, order }))
      ))
    ), 
    catchError(error => {
      console.error('Error creating guest user', error);
      return throwError(() => new Error('Failed to create guest user'));
    })
  }

}
