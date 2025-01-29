import { Component, inject, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { BackendServiceService } from "../../services/backend-service.service";
import { UserReturnDTO } from "../../interface/usuario";
import {
  Observable,
  switchMap,
  map,
  catchError,
  throwError,
  tap,
  takeUntil,
  Subject,
} from "rxjs";
import { UserWithOrder } from "../../interface/userWithOrder";
import { RequestStatus } from "../../interface/requestStatus";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [],
  template: `
    <section>

      @if (status === "LOADING") {
      <div class="absolute -translate-y-1/2 translate-x-1/2 right-1/2 mt-10">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      </div>
      } @else if(status === "ERROR") {
        <div class="absolute -translate-y-1/2 translate-x-1/2 right-1/2 mt-10">
        <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Problema al entrar, servidor ocupado. 
            </span>
        </div>
      }

      <div class="bg-gray-100 h-[60vh]"></div>
    </section>
    <section>
      <div class="grid grid-cols-12 gap-7 mx-10 py-11 2xl:mx-72 2xl:py-20">
        <button
          (click)="navigateToMenu()"
          class="bg-primary-950 col-span-8 w-full text-white rounded-md hover:shadow-2xl hover:-translate-y-1 hover:shadow-primary-950/50 transition-shadow duration-300"
        >
          <h3 class="text-xl font-semibold">Ordenar</h3>
        </button>
        <button
          class="bg-primary-100 col-span-4 w-full text-text p-3 rounded-md"
        >
          <h3 class="text-xl font-semibold">Ingresar</h3>
        </button>
      </div>
    </section>
  `,
  styles: ``,
})
export class LoginComponent implements OnDestroy {
  router = inject(Router);
  backendService = inject(BackendServiceService);
  combinedData$!: Observable<UserWithOrder | null>;
  destroy$ = new Subject<void>();
  status: RequestStatus = RequestStatus.IDLE;
  errorLogin$!: boolean;
  user$!: UserReturnDTO | null;

  constructor() {
  }

  setStatusLoading() {
    this.status = RequestStatus.LOADING;
  }

  setStatusIdle() {
    this.status = RequestStatus.IDLE;
  }

  setStatusSuccess() {
    this.status = RequestStatus.SUCCESS;
  }

  setStatusError() {
    this.status = RequestStatus.ERROR;
  }

  //Crea un usuario y una orden asociada
  navigateToMenu() {
    this.setStatusLoading();

    this.combinedData$ = this.backendService.addGuestUser().pipe(

      catchError((error) => {
        this.setStatusError();
        console.error("Error creating user", error);
        return throwError(() => new Error("Failed to create user"));
      }),

      tap((user) => console.log("Usuario creado:", user)),

      switchMap((user) =>
        this.backendService.addOrder(user).pipe(
          map((order) => ({ user, order })), // Combinar los datos del usuario y la orden

          //Redirige a la pagina del menu
          //Carga el usuario con su orden
          tap((combined) => {
            console.log("Datos combinados:", combined);
            this.setStatusSuccess();
            sessionStorage.setItem("userWithOrder", JSON.stringify(combined));

            this.router.navigate(["/menu"]);
          })
        )
      )
    ),
      catchError((error) => {
        console.error("Error creating order", error);
        this.errorLogin$ = true;
        return throwError(() => new Error("Failed to create order"));
      });

    this.combinedData$.pipe(takeUntil(this.destroy$)).subscribe((combined) => {
      console.log("Datos combinados:", combined);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
