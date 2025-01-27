import { Component, input } from "@angular/core";
import { CoffeeReturnDTO } from "../../../../interface/coffes";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [],
  template: `
    <section class="">
      <div class="bg-white rounded-xl shadow-md p-4 hover:bg-background-100">
        <img class="object-cover w-full h-32 rounded-lg mb-3" src="" alt="imagen cafe">
        <div class="flex justify-between items-center">
          <h3 class="font-semibold text-xl text-text-700">{{coffee$().Name}}</h3>
          <div class="flex items-center justify-normal gap-1">
          <img class="w-4 h-4" src="../assets/clock.svg" alt="" srcset="">
          <p>
            {{coffee$().BaseTime}}
          </p>
          </div>
        </div>
        <h5 class="text-md text-text-400">{{coffee$().Description }}</h5>
        <div class="flex justify-between items-center mt-2">
          <span class="font-medium text-accent-500">{{coffee$().Prices[0].Price }} mxm</span>
          <button class="px-4 py-2 bg-accent-500 text-white rounded-lg text-md hover:bg-accent-700">Add</button>
        </div> 
      </div>
    </section> 
  `,
  styles: ``,
})
export class CardComponent {
  coffee$ = input.required<CoffeeReturnDTO>();
}
