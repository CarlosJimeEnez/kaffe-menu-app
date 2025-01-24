import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template:`
      <section>
        <div class="bg-background-100 p-3 flex justify-around items-center">
          <div>
            <h1>Mexico / Puebla </h1>
          </div>
          <div>

          </div>
          <div>
            <p>dia / mes / año</p>
          </div>
        </div>
      </section>
    `,
  styles:
    `
      
    `
})
export class HeaderComponent {

}
