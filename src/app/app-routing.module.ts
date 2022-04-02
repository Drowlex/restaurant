import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailMenuPageComponent } from './pages/detail-menu-page/detail-menu-page.component';
import { DetailIngredientPageComponent } from './pages/detail-ingredient-page/detail-ingredient-page.component';
import { DetailUserPageComponent } from './pages/detail-user-page/detail-user-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail_menu/:tipo/:id',
    component: DetailMenuPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail_ingredient/:name',
    component: DetailIngredientPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: DetailUserPageComponent,
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
