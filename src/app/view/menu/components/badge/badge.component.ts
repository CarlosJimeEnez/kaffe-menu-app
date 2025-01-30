import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  template: `
      <button
        [class]="isActive$() ? 
          'px-4 py-2 bg-accent-600 text-white hover:bg-accent-700 hover:text-white rounded-full text-lg whitespace-nowrap'
           :
           'px-4 py-2 bg-accent-100 hover:text-white text-black hover:bg-accent-600 rounded-full text-lg whitespace-nowrap'">
        <p>{{ text$() }}</p>
      </button>`,
  styles: [`
  `]
})
export class BadgeComponent {
  text$ = input.required<string>();
  isActive$ = input.required<boolean>();
}
