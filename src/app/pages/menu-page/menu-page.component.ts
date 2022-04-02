import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  listItems$ : Observable<any> = of();
  term: any;

  constructor(
    private toastr: ToastrService,
    private router: Router, 
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.initial_data();
  }
  initial_data() {
    this.listItems$ = this.restaurantService.getAllMenu();
  }
  details(item: any) {
    // this.toastr.info("En desarrollo");
    let id: number = item?.idMeal;
    this.router.navigate([`/detail_menu/2/${id}`]);
    
  }

}
