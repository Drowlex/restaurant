import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-detail-menu-page',
  templateUrl: './detail-menu-page.component.html',
  styleUrls: ['./detail-menu-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailMenuPageComponent implements OnInit {
  item$  : Observable<any> = of();
  tipo   : number = 1;
  menu_id: number = 0;


  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => this.tipo = params.tipo);
    this.route.params.subscribe((params: any) => this.menu_id = params.id);
    this.initial_data();
  }
  private initial_data() {
    this.item$ = this.restaurantService.getMenuFilter(this.menu_id);
  }
  getUUIDYoutube( url: string ): string {
    const urlArray = url.split("v=");
    return urlArray.length > 0 ? urlArray[urlArray.length - 1] : '';
  }

}
