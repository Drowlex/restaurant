import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-page',
  templateUrl: './ingredient-page.component.html',
  styleUrls: ['./ingredient-page.component.scss']
})
export class IngredientPageComponent implements OnInit {

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
    this.listItems$ = this.restaurantService.getAllIngredient();
  }
  details(item: any) {
    let name: string = item?.strIngredient;
    this.router.navigate([`/detail_ingredient/${name}`]);
  }

}
