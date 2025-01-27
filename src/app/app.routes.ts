import { Routes } from "@angular/router";
import { LoginComponent } from "./view/login/login.component";
import { MenuComponent } from "./view/menu/menu.component";
import { CardDetailsComponent } from "./view/card-details/card-details.component";

export const routes: Routes = [
    {path: 'menu', component: MenuComponent},
    {path: 'login', component: LoginComponent},
    {path: 'card-details', component: CardDetailsComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];
