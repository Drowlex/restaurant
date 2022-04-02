import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule, NgbDropdownModule, NgbPaginationModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { IngredientPageComponent } from './pages/ingredient-page/ingredient-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

// PIPE FILTER
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailMenuPageComponent } from './pages/detail-menu-page/detail-menu-page.component';

import { YouTubePlayerModule } from "@angular/youtube-player"

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

import { DialogConfigsComponent } from './components/dialog-configs/dialog-configs.component';
import { DetailIngredientPageComponent } from './pages/detail-ingredient-page/detail-ingredient-page.component';
import { DetailUserPageComponent } from './pages/detail-user-page/detail-user-page.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    DashboardPageComponent,
    IngredientPageComponent,
    MenuPageComponent,
    ProfilePageComponent,
    DetailMenuPageComponent,
    DialogConfigsComponent,
    DetailIngredientPageComponent,
    DetailUserPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgbAlertModule,
    NgbNavModule,
    NgbDropdownModule, 
    NgbPaginationModule, 
    Ng2SearchPipeModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    YouTubePlayerModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
