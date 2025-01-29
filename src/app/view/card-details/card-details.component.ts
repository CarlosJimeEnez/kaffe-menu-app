import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeReturnDTO } from '../../interface/coffes';
import { BadgeCustomComponent } from "./components/badge-custom/badge-custom.component";
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPrice } from '../../interface/productPrice';
import { CantidadWidgetComponent } from "./components/cantidad-widget/cantidad-widget.component";
import { OrdersDetailsInsertDTO, OrdersDetailsReturnDTO } from '../../interface/ordersDetails';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { BackendServiceService } from '../../services/backend-service.service';
import { RequestStatus } from '../../interface/requestStatus';
@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [BadgeCustomComponent, ReactiveFormsModule, CantidadWidgetComponent],
  template: `
    @if (coffee) {
      @if (status === "LOADING") {
      <div class="absolute -translate-y-1/2 translate-x-1/2 right-1/2 mt-10">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      </div>
      } @else if(status === "ERROR") {
        <div class="absolute -translate-y-1/2 translate-x-1/2 right-1/2 mt-10">
        <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Problema al entrar, servidor ocupado. 
            </span>
        </div>
      }

      <section>
        <div class="grid grid-cols-1 gap-4 py-5 mx-3 md:grid-cols-2 h-screen">
          
        <section class="col-span-1">
            <div class="absolute cursor-pointer top-5 left-5" (click)="navigateBack()">
              <img class="w-9 h-9 " src="../../assets/arrow_back.svg" alt="atras">
            </div>
          </section>

          <section class=" col-span-1 ">
            <div class="py-5 mx-3">
              <h2 class="text-4xl font-bold">{{coffee.Name}}</h2>
              <h5 class="text-xl font-semibold text-gray-700">MXN: {{coffee.Prices[0].Price}}</h5>
              <p class="text-base font-normal text-gray-500">
                {{coffee.Description}}
              </p>

              <hr class="my-3 border-t-2 border-gray-400">

              <section>
                <div class="flex items-center justify-start gap-3">
                  <h2 class="text-2xl font-bold">Tamaño</h2>
                  <app-badge-custom class="text-lg" [texto$]="'requerido'" [alertColor$]="required"></app-badge-custom>
                </div>   
                
                <form (ngSubmit)="onSubmitProduct()" [formGroup]="coffeForm">  
                @for (item of coffee.Prices; track $index) {
                  <div class="flex justify-between text-xl py-5 {{$index != coffee.Prices.length - 1 ? 'border-b' : ''}}" (click)="updateValue(item, $index)">
                    <div class="flex items-center">
                      <input id="size-{{$index}}" type="radio" formControlName="size" value={{item.Size}} class="w-6 h-6" />
                      <h5 class="mx-3 font-semibold">{{item.Size}}</h5>
                    </div>
                    @if($index != 0){
                      <h5 class="mx-4 font-bold">+MXM {{item.Price}}</h5>
                    }@else {
                      <h5 class="mx-4 font-bold">MXM {{item.Price}}</h5>
                    }
                  </div>
                }    

                </form>
                <hr class="my-3 border-t-2 border-gray-400">
                
                <h2 class="text-2xl font-bold">Cantidad</h2>

                <app-cantidad-widget [initialQuantity$]="this.quantity$()" (quantityChange$)="onQuantityChange($event)"></app-cantidad-widget>

              </section>   
              <div class="flex flex-col justify-around items-center text-xl font-bold leading-none">
              <button (click)="onSubmitProduct()" class="p-4 border rounded-lg p-3 bg-accent-500 text-white  hover:bg-accent-600">
                <h3 class="p-2">Añadir <span>( {{this.quantity$()}} )</span> a el carrito</h3>
                <div class="pb-2">-</div>
                <div>
                   <p>MXM {{(this.coffeForm.value.price || 0) * this.quantity$()}}</p> 
                  </div>
              </button> 
            </div> 
            </div>
            

          </section>
          
        </div>
      </section>  
    } @else {
      <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
        </div>
      </div>
    }

    
    
  `,
  styles: ``
})
export class CardDetailsComponent {
  backendService = inject(BackendServiceService)
  router = inject(Router)
  coffee: CoffeeReturnDTO | null = null;
  formBuilder = inject(FormBuilder)
  required: boolean = false
  quantity$ = signal<number>(1);
  isSubmitted = signal<boolean>(false);
  backendResponse$!: Observable<OrdersDetailsReturnDTO | null>
  status: RequestStatus = RequestStatus.IDLE;

  coffeForm = this.formBuilder.group({
    size: ['', Validators.required],
    price: [0, Validators.required],
    product: [0, Validators.required]
  })

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: any };
    if (state) {
      this.coffee = state.data;
      console.log('Datos recibidos:', this.coffee);
    }
  }

  setStatusLoading() {
    this.status = RequestStatus.LOADING;
  }

  setStatusIdle() {
    this.status = RequestStatus.IDLE;
  }

  setStatusSuccess() {
    this.status = RequestStatus.SUCCESS;
  }

  setStatusError() {
    this.status = RequestStatus.ERROR;
  }

  navigateBack() {
    this.router.navigate(['/menu']);
  }

  updateValue(item: ProductPrice, index: number) {
    this.coffeForm.patchValue({
      size: item.Size,
      price: item.Price,
      product: index
    });
  }

  onQuantityChange(quantity: number) {
    this.quantity$.set(quantity);
  }

  onSubmitProduct() {
    if (this.coffeForm.valid) {
      this.setStatusLoading();
      const formValues = this.coffeForm.value;

      this.backendService.getIdSizeByName(formValues.size || '').pipe(
        catchError((error) => {
          console.error('Error getting size ID', error);
          return throwError(() => new Error('Failed to get size ID'));
        })
      ).subscribe(sizeId => {
        const orderDetails: OrdersDetailsInsertDTO = {
          orderId: JSON.parse(sessionStorage.getItem('userWithOrder') || '{}').order.Id,
          price: Number(formValues.price) || 0,
          productId: this.coffee?.Id ?? 0,
          sizeId: sizeId,
          quantity: this.quantity$() || 1
        };


        //Submit orderDetail
        this.backendService.addOrderDetails(orderDetails).pipe(
          catchError((error) => {
            this.setStatusError();
            return throwError(() => new Error('Failed to create order detail'));
          }),
          tap((response) => {
            console.log('Respuesta del backend:', response);
          }),
          map((orderDetail) => (
            {user: JSON.parse(sessionStorage.getItem('userWithOrder') || '{}').user,
              order: JSON.parse(sessionStorage.getItem('userWithOrder') || '{}').order,
              orderDetail}
          )),
          tap((combined) => {
            console.log('Datos combinados:', combined);
            sessionStorage.setItem("userWithOrderAndOrderDetail", JSON.stringify(combined));
          })
            
        ).subscribe(() => {
          this.setStatusSuccess();
          this.router.navigate(['/menu']);
        });
      });
    }
    else {
      this.required = true;
      this.coffeForm.markAllAsTouched();
      console.log('Formulario no válido: ', this.coffeForm);
      return;
    }
  }
}
