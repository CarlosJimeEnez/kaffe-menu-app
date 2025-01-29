import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-view-card',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
     <div routerLink="/cart-view" routerLinkActive="router-link-active"  class="hover:bg-secondary-300 flex  items-center space-x-3 rounded-xl font-bold text-xl text-text-800 p-4 fixed bg-secondary-500 translate-y-1/2 translate-x-1/2 bottom-20 right-1/2 cursor-pointer">
       <img class="h-9 w-9 mb-1" src="../assets/shopping_cart.svg" alt="shopping cart">
      <button>
        <p class="text-white">Ver Carrito <span>( {{quantity$()}} )</span></p>
      </button>
     </div>
    `,
  styles: `
  
  `
})
export class ViewCardComponent {
  quantity$ = input.required<number>()
}
