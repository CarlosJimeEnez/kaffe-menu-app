import { Component } from "@angular/core";
import { HeaderComponent } from "../../layouts/header/header.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { CardComponent } from "./components/card/card.component";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [HeaderComponent, SearchBarComponent, CardComponent],
  template: `
    <!-- Header -->
    <section>
      <app-header></app-header>
    </section>

    <div class="min-h-screen bg-background-50">
      <section>
        <div class="max-w-3xl mx-auto p-4">
          <div class="flex justify-between items-center mb-6">
            <div class="w-3/4">
              <h1 class="text-5xl font-bold ">
                Elige el mejor
                <span
                  class="bg-gradient-to-l from-accent-500 to-accent-700 bg-clip-text text-transparent"
                  >cafe</span
                >
                para ti
              </h1>
            </div>
          </div>

          <!-- Search Bar -->
          <app-search-bar></app-search-bar>

          <!-- Categories -->
          <div class="flex gap-4 mb-6 overflow-x-auto py-2">
            <button
              class="px-4 py-2 bg-accent-500 text-white hover:bg-accent-600 rounded-full text-lg whitespace-nowrap "
            >
              Todos
            </button>
            <button
              class="px-4 py-2 bg-white text-gray-600 hover:bg-accent-600 hover:text-white rounded-full text-lg whitespace-nowrap"
            >
              Desarrollo
            </button>
            <button
              class="px-4 py-2 bg-white text-gray-600 hover:bg-accent-600 hover:text-white rounded-full text-lg whitespace-nowrap"
            >
              Desarrollo
            </button>
            <button
              class="px-4 py-2 bg-white text-gray-600 hover:bg-accent-600 hover:text-white rounded-full text-lg whitespace-nowrap"
            >
              Desarrollo
            </button>
          </div>

          <!-- Todos cafes -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-text-700 text-3xl">Todos los cafes</h2>
            </div>

            <!-- Caffes Grid -->
            <div class="grid grid-cols-2 gap-4">
              <app-card></app-card>
              <app-card></app-card>
            </div>
          </div>

          <!-- Best Matches Section -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-800">
                Best Matches Near You
              </h2>
              <a href="#" class="text-amber-600 text-sm">See All</a>
            </div>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-xl shadow-md flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400"
                  alt="Beans"
                  class="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 class="font-semibold text-gray-800">Beans All Day</h3>
                  <div class="flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-amber-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span>4.8</span>
                    <span>(2.5k)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: ``,
})
export class MenuComponent {}
