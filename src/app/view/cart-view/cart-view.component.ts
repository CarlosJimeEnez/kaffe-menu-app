import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CantidadWidgetComponent } from "../../components/cantidad-widget/cantidad-widget.component";
import { UserWithOrderAndOrderDetail } from '../../interface/userWithOrderAndOrderDetail';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { CoffeeReturnDTO } from '../../interface/coffes';
import { BackendServiceService } from '../../services/backend-service.service';
import { AsyncPipe } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';
@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [RouterLink, CantidadWidgetComponent, AsyncPipe],
  template: `
    
    <section class="min-h-screen max-w-4xl mx-auto px-4">

    <!-- Back button   -->
      <button routerLink="/menu" class="absolute top-5 left-5">
        <img class="w-8 h-8" src="../../assets/arrow_back.svg" alt="Atras">
      </button>

      <header class="flex flex-row justify-start p-5">
        <h1 class="font-bold text-2xl">Mi Carrito</h1>
      </header>  
      
      <div class="flex flex-col gap-4 items-center ">  
        @for (item of cardItemsList ; track $index ) {
        <div class="flex flex-col justify-between items-center bg-white rounded-xl shadow-md p-4  md:flex-row w-3/5 ">
          <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="">
          
          <div class="flex flex-col justify-between align-center p-4 leading-normal w-full">
            <div class="flex flex-row items-center space-x-10">
              <h5 class=" text-lg font-bold tracking-tight text-gray-700">
                {{getCoffeInCoffes(item.orderDetails.ProductId)?.Name || 'N/A'}}
              </h5>
              <h5 class=" text-xl font-bold tracking-tight text-gray-900">MXM {{item.orderDetails?.Price || 'N/A'}}</h5>
            </div>
            <div class="flex flex-row space-x-10">
              <app-cantidad-widget [initialQuantity$]="item.orderDetails.Quantity" (quantityChange$)="onQuantityChange($event, $index)"></app-cantidad-widget>
              <button (click)="onRemoveItem($index)" class="text-red-500 hover:text-red-700">
                <img class="w-7 h-7" src="../../assets/delete_forever.svg" alt="borrar">
              </button>
            </div>
          </div>
        </div>
      }           
      <button (click)="onCartPurchase()" class="hover:bg-accent-600 absolute bottom-5 right-10 rounded-xl p-5 text-white font-bold text-2xl bg-accent-400">
        Comprar
      </button>
      
      
  </div> 
  </section>
  `,
  styles: ``
})
export class CartViewComponent implements OnInit {
  router = inject(Router)
  cardItemsList: UserWithOrderAndOrderDetail[] = []
  coffes: CoffeeReturnDTO[] = []
  product$!: Observable<CoffeeReturnDTO>
  backendService = inject(BackendServiceService)
  cartService = inject(CartServiceService)

  ngOnInit(): void {
    this.getCartItems();
    this.getCoffes();
  }
  getCoffeInCoffes(id: number): CoffeeReturnDTO | undefined {
    return this.coffes.find(coffee => coffee.Id === id);
  }

  getCoffes(): void {
    const existingCoffes = sessionStorage.getItem('coffes');
    this.coffes = existingCoffes ? JSON.parse(existingCoffes) : [];
    console.warn('Coffes', this.coffes)
  }

  getCartItems(): void {
    this.cardItemsList = this.cartService.getItems() 
  }

  onQuantityChange(quantity: number, index: number) {
    this.cardItemsList[index].orderDetails.Quantity = quantity
    sessionStorage.setItem('ListCardItems', JSON.stringify(this.cardItemsList))
  }

  onRemoveItem(index: number) {
    this.cardItemsList.splice(index, 1)
    sessionStorage.setItem('ListCardItems', JSON.stringify(this.cardItemsList))
  }

  onCartPurchase() {
    console.log('Compra:', this.cardItemsList)
    this.backendService.addPurchase(this.cardItemsList).pipe(
      tap((response) => {
        console.log('Respuesta del backend:', response);
        this.router.navigate(['/menu'])
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Failed to create order'));
      })
    ).subscribe()
  }
}
