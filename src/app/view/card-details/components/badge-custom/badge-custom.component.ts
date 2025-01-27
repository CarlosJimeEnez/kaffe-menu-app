import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge-custom',
  standalone: true,
  imports: [],
  template: `
  <span class="bg-accent-500 text-text-600 text-xs font-bold me-2 px-2.5 py-0.5 rounded-md dark:bg-accent-50 dark:text-accent-700">
    {{texto$()}}
  </span>
  `,
  styles: ``
})
export class BadgeCustomComponent {
  texto$ = input.required<string>()
}
