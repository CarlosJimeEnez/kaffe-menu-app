import { Routes } from "@angular/router";
import { LoginComponent } from "./view/login/login.component";
import { MenuComponent } from "./view/menu/menu.component";

export const routes: Routes = [
    {path: 'menu', component: MenuComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];
