import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-detail-ingredient-page',
  templateUrl: './detail-ingredient-page.component.html',
  styleUrls: ['./detail-ingredient-page.component.scss']
})
export class DetailIngredientPageComponent implements OnInit {
  item$ : Observable<any> = of();
  name: number = 0;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => this.name = params.name);
    this.initial_data();

  }
  private initial_data() {
    this.item$ = this.restaurantService.getIngredentFilter(this.name);
  }

}
