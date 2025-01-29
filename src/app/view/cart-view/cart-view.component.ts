import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [],
  template: `
    <header>
      <h1>Mi Carrito</h1>
    </header>

    <section class="min-h-screen border max-w-4xl mx-auto px-4">
      
        <div class="flex flex-row border gap-5">
          <!-- Image    -->
          <div>

          </div>

          <!-- Details   -->
           <div class="flex flex-row gap-4">
            <!-- Price  -->
              <div class="flex flex-row space-x-8">
                <h4>Price: </h4>
                <h4>.5</h4>
              </div>
              <!--  -->
              <div class="flex flex-row">
                <div>+</div>
                <div>2</div>
                <div>-</div>  
              </div>
           </div>
        </div>
   
    </section>
   
  `,
  styles: ``
})
export class CartViewComponent {

}
