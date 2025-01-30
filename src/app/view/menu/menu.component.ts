import { Component, inject, OnInit, Type } from "@angular/core";
import { HeaderComponent } from "../../layouts/header/header.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { CardComponent } from "./components/card/card.component";
import { BackendServiceService } from "../../services/backend-service.service";
import { CoffeeReturnDTO } from "../../interface/coffes";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AsyncPipe } from '@angular/common';
import { BadgeComponent } from "./components/badge/badge.component";
import { ViewCardComponent } from "./components/view-card/view-card.component";
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
                <p>No se encontraron cafes</p>
              }
            </div>
          </div>

          @if (cartItemsList.length > 0) {
            <app-view-card [quantity$]="cartItemsList.length"></app-view-card>
          }

          <!-- Best Matches Section -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-800">
                Best Matches Near You
              </h2>
              <a href="#" class="text-amber-600 text-sm">See All</a>
            </div>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-xl shadow-md flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400"
                  alt="Beans"
                  class="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 class="font-semibold text-gray-800">Beans All Day</h3>
                  <div class="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-amber-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span>4.8</span>
                    <span>(2.5k)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
