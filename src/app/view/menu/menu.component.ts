import { Component, inject, OnInit, Type } from "@angular/core";
import { HeaderComponent } from "../../layouts/header/header.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { CardComponent } from "./components/card/card.component";
import { BackendServiceService } from "../../services/backend-service.service";
import { CoffeeReturnDTO } from "../../interface/coffes";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AsyncPipe } from '@angular/common';
import { BadgeComponent } from "./components/badge/badge.component";
import { ViewCardComponent } from "./components/view-cart-button/view-cart-button.component";
import { UserWithOrderAndOrderDetail } from "../../interface/userWithOrderAndOrderDetail";
import { CartServiceService } from "../../services/cart-service.service";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [HeaderComponent, SearchBarComponent, CardComponent, AsyncPipe, BadgeComponent, ViewCardComponent],
  template: `
    <!-- Header -->
    <section>
      <app-header></app-header>
    </section>

    <div class="min-h-screen bg-background-50">
      <section>
        <div class="max-w-5xl mx-auto p-4">
          
        <!-- <div class="flex justify-between items-center mb-6">
            <div class="w-3/4">
              <h1 class="text-5xl font-bold ">
                Elige el mejor
                <span
                  class="bg-gradient-to-l from-accent-500 to-accent-700 bg-clip-text text-transparent"
                  >cafe</span
                >
                para ti
              </h1>
            </div>
          </div> -->

          <!-- Search Bar -->
          <app-search-bar></app-search-bar>

          <!-- Categories -->
          <div class="flex gap-4 mb-6 overflow-x-auto py-2">
            <app-badge [text$]="'Todos'"></app-badge>
            <app-badge [text$]="'Desarrollo'"></app-badge>
            <app-badge [text$]="'Diseño'"></app-badge>
          </div>

          <!-- Todos cafes -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-text-700 text-3xl">Todos los cafes</h2>
            </div>

            <!-- Caffes Grid -->
            <div class="grid grid-cols-3 gap-4">
              @if (coffes$ | async; as coffes) {
                @for (item of coffes; track $index) {
                  <app-card [coffee$]="item"></app-card>
                }
              } @else {
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
              }
            </div>
          </div>

          @if (cartItemsList.length > 0) {
            <app-view-card [quantity$]="cartItemsList.length"></app-view-card>
          }

          
        
        </div>
      </section>
    </div>
  `,
  styles: ``,
})
export class MenuComponent implements OnInit {
  backendService = inject(BackendServiceService);
  coffes$!: Observable<CoffeeReturnDTO[] | null>; ;
  cartItemsList: UserWithOrderAndOrderDetail[] = []
  cartService = inject(CartServiceService)

  constructor() {}

  //Carga los cafes
  ngOnInit() {
    this.coffes$ = this.backendService
      .getProductsByCategory("cafe")
      .pipe(
        tap((coffes) => {
          console.log("Cafes cargados:", coffes)
          sessionStorage.setItem("coffes", JSON.stringify(coffes));
        }),
        catchError((error) => {
          console.error("Error loading coffes", error);
          return throwError(() => new Error("Failed to load coffes"));
        })
      );

    this.getCartItems();
  }

  getCartItems(): void {
    const items = this.cartService.getItems()
    this.cartItemsList = items
    console.log('Items del carrito:', items)
  };

}
