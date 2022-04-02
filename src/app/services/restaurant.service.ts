import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpUtilsService } from './http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private api_url = environment.api_url;
  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService
  ) {}

  getAllIngredient(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/list.php?i=list`);
  }
  getAllMenu(): Observable<any> {
    const httpParams  = this.httpUtils.setHTTPParams({'s': 'a'});
    return this.http.get<any>(`${this.api_url}/search.php`, {params: httpParams});
  }
  getRandom(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/random.php`);
  }
  getMenuFilter( identifier: number ): Observable<any> {
    const httpParams  = this.httpUtils.setHTTPParams({'i': identifier});
    return this.http.get<any>(`${this.api_url}/lookup.php`, { params: httpParams });
  }
  getIngredentFilter( name: number ): Observable<any> {
    const httpParams  = this.httpUtils.setHTTPParams({'s': name});
    // return this.http.get<any>(`${this.api_url}/filter.php`, { params: httpParams });
    return this.http.get<any>(`${this.api_url}/search.php`, {params: httpParams});

  }
}
