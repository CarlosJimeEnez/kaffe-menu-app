import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeReturnDTO } from '../../interface/coffes';
import { BadgeCustomComponent } from "./components/badge-custom/badge-custom.component";
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPrice } from '../../interface/productPrice';
@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [BadgeCustomComponent, ReactiveFormsModule],
  template: `
    @if (coffee) {
      <section>
        <div class="grid grid-cols-1 gap-4 py-5 mx-3 md:grid-cols-2 h-screen">
          
        <section class="col-span-1">
            <div class="absolute cursor-pointer top-5 left-5" (click)="navigateBack()">
              <img class="w-9 h-9 " src="../../assets/arrow_back.svg" alt="atras">
            </div>
          </section>

          <section class=" col-span-1 border">
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
                  <app-badge-custom [texto$]="'requerido'" [alertColor$]="required"></app-badge-custom>
                </div>   
                
                <form (ngSubmit)="onSubmitProduct()" [formGroup]="coffeForm">  
                @for (item of coffee.Prices; track $index) {
                  <div class="flex justify-between  py-5 {{$index != coffee.Prices.length - 1 ? 'border-b' : ''}}" (click)="updateValue(item)">
                    <div class="flex items-center">
                      <input id="size-{{$index}}" type="radio" formControlName="size" value={{item.Size}} class="w-6 h-6" />
                      <h5 class="mx-3">{{item.Size}}</h5>
                    </div>
                    <h5 class="mx-4">{{item.Price}}</h5>
                  </div>
                }    

                </form>
                <hr class="my-3 border-t-2 border-gray-400">
                
                
              </section>    
            </div>
            <div class="flex flex-row w-full justify-around  items-end flex-grow">
                  <button (click)="onSubmitProduct()" class="mt-4 border rounded-lg p-5 bg-accent-500 text-white w-3/4 hover:bg-accent-600">
                    <h3>Añadir a el carrito</h3>
                  </button> 
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

  router = inject(Router)
  coffee: CoffeeReturnDTO | null = null;
  formBuilder = inject(FormBuilder)
  required: boolean = false
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
    }
  }

  navigateBack() {
    this.router.navigate(['/menu']);
  }

  updateValue(item: ProductPrice) {
    this.coffeForm.patchValue({
      size: item.Size,
      price: item.Price,
      product: item.id
    });
  }

  onSubmitProduct() {
    if (this.coffeForm.valid) {
      console.log(this.coffeForm.value);
    }
    else {
      this.required = true
      this.coffeForm.markAllAsTouched();
      console.log('Formulario no válido');
      return;
    }
  }
}
