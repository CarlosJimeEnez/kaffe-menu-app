import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge-custom',
  standalone: true,
  imports: [],
  template: `
  <span [class]="alertColor$() ? 'bg-red-100 text-red-700 text-xs font-bold me-2 px-2.5 py-0.5 rounded-md' : 
    'bg-accent-100 text-text-700 text-xs font-bold me-2 px-2.5 py-0.5 rounded-md'">
    {{texto$()}}
  </span>
  `,
  styles: ``
})
export class BadgeCustomComponent {
  texto$ = input.required<string>()
  alertColor$ = input.required<boolean>()
}
