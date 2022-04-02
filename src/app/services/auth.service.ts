import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDataService } from './auth-data.service';
import { User } from '../models/users.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
  constructor(private authDataService: AuthDataService) {}
  
  get(): Observable<any[]> {
    return this.authDataService.get();
  }
  login(username: string, password: string): Observable<boolean> {
      return this.authDataService.search(username, password);
  }
  currentUserValue(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  logout() {
    localStorage.removeItem('currentUser')
  }
  getAllUser(): Observable<Array<User>> {
    return this.authDataService.getAll();
  }
  change(id: number, item: any): Observable<boolean> {
    return this.authDataService.change(id, item);
  }
}
