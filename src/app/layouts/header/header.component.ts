import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe],
  template:`
      <section>
        <div class="bg-background-100 p-3 flex justify-around items-center">
          <div>
            <h1 class="text-gray-700 font-bold text-lg">Mexico / Puebla </h1>
          </div>
          <div>

          </div>
          <div>
            <p class="text-gray-500 text-lg">{{currentDate | date:'dd/MM/yyyy'}}</p>
          </div>
        </div>
      </section>
    `,
  styles:
    `
      
    `
})
export class HeaderComponent {
  currentDate = new Date();
}
