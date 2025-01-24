import { Component } from "@angular/core";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [],
  template: `
    <section>
      <div class="bg-white rounded-xl shadow-md p-4">
        <img class="object-cover w-full h-32 rounded-lg mb-3" src="" alt="">
        <h3 class="font-semibold text-xl text-text-700">Cappuchinno</h3>
        <h5 class="text-md text-text-400">Descripcion</h5>
        <div class="flex justify-between items-center mt-2">
          <span class="font-medium text-accent-500">$5</span>
          <button class="px-4 py-2 bg-accent-500 text-white rounded-lg text-md hover:bg-accent-700">Add</button>
        </div> 
      </div>
    </section> 
  `,
  styles: ``,
})
export class CardComponent {}
