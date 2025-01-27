import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  template: `
      <button
        class="px-4 py-2 bg-accent-500 text-white hover:bg-accent-600 rounded-full text-lg whitespace-nowrap ">
        <p>{{ text$() }}</p>
      </button>`,
  styles: [`
  `]
})
export class BadgeComponent {
  text$ = input.required<string>();
  
 
}
