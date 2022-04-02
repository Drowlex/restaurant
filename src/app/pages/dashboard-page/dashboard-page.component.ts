import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/users.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigsComponent } from '../../components/dialog-configs/dialog-configs.component';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  items_carrusel: Array<any> = [];
  loading: boolean = true;

  user: User | undefined;
  constructor(
    private ngZone           : NgZone,
    private dialog           : MatDialog,
    private router           : Router, 
    private authService      : AuthService,
    private restaurantService: RestaurantService
  ) { }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    if (this.dialog.openDialogs.length > 0) {
      // If dialogs are open, close the top one
      this.ngZone.run(() => {
        this.dialog.openDialogs[this.dialog.openDialogs.length - 1].close();
      });
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.initial_data();
    this.initial_carrusel();
    
  }

  private getUser() {
    this.user = this.authService.currentUserValue();
  }
  private initial_data() {
    this.restaurantService.getRandom().subscribe({
      next: ( data_random: any ) => {
        const dialogRef = this.launchPopup('350px', { option: 'platillo-random', args: data_random });
        if (dialogRef) {
            dialogRef.afterClosed().subscribe((result: any) => {
              if (result) {
                let id: number = result?.meals[0].idMeal;
                this.router.navigate([`/detail_menu/1/${id}`]);
              }
            });
        }    
      }
    });
  }

  private initial_carrusel() {
    setInterval(() => {
      console.log("Reseteando el carrusel")
      this.items_carrusel = [];
      this.loading = true;
      this.initial_carrusel();
    }, 300000);//Miliseconds, 5 minutes

    let listRequest: any[] = [];
    for (let index = 0; index < 5; index++) {
      listRequest.push(this.restaurantService.getRandom().pipe(
        map(res => { return { success: true, data: res } }),
        catchError(error => of({ success: false, error: error }))
      ));
    }

    forkJoin(listRequest).subscribe({
      next: ( result: any ) => {
        for (let item of result) {
          if (item?.success) {
            this.items_carrusel.push({
              id   : item.data?.meals[0].idMeal,
              image   : item.data?.meals[0].strMealThumb,
              category: item.data?.meals[0].strCategory,
              meal    : item.data?.meals[0].strMeal
            })
          }
          
        }
        this.loading = false;
      }
    });
  }
  /**
   * Create floating windows
   * @param {String} size
   * @param {Object} arg 
   */
  launchPopup( size: string, args: any = null ): any {
    if (this.permitOpenDialog()) {
      // if (!this.helpersUtilsService.isEmpty(args)) {
        const dialogRef = this.dialog.open(DialogConfigsComponent, { width: size, data: args, hasBackdrop: true, disableClose: true });
        return dialogRef;
    }
  }
  /**
   * Validate if there is an open dialog
   */
  private permitOpenDialog(): boolean {
    // this.toastr.error("No es posible realizar esta acción en este momento");
    if (this.dialog.openDialogs.length > 0) return false;
    else return true;
  }
}
