import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { users } from './data';
// import { User } from '../models/users.model';

@Injectable({
    providedIn: 'root'
})
export class AuthDataService {
    get(): any {
        return timer(1000).pipe(mapTo(users));
    }
    search(username: string, password: string) {
        let user = users.find(value => (value.username === username && value.password === password));
        localStorage.setItem('currentUser', JSON.stringify(user));
        return timer(1000).pipe(mapTo(Boolean(user)));
    }
    post(item: any): any {
        return timer(1).pipe(mapTo(true));
    }
}