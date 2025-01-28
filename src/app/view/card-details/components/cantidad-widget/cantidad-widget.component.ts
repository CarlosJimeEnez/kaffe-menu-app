import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cantidad-widget',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-row items-center space-x-3 py-5 ">
      <div class="flex items-center justify-center bg-accent-50 rounded-xl w-10 h-10 cursor-pointer select-none" (click)="remove()">
        <button type="button" class="text-2xl text-accent-700 font-bold" >
          -
        </button>
      </div>
      <div class="flex items-center justify-center  rounded-xl w-10 h-10">
        <p class="text-2xl text-text font-bold">
          {{ initialQuantity$() }}
        </p>
      </div>     
      <div class="flex items-center justify-center bg-accent-50 rounded-xl w-10 h-10 cursor-pointer select-none" (click)="add()">
        <button type="button" class="text-2xl text-accent-700 font-bold  ">
          +
        </button>
      </div>
    </div>
  `,
  styles: ``
})
export class CantidadWidgetComponent {
  initialQuantity$ = input.required<number>();
  quantityChange$ = output<number>();

  add() {
    this.quantityChange$.emit(this.initialQuantity$() + 1);
  }

  remove() {
    if (this.initialQuantity$() === 1) return;
    this.quantityChange$.emit(this.initialQuantity$() - 1);
  }
}
