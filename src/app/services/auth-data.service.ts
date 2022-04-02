import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { users } from './data';
import { User } from '../models/users.model';

@Injectable({
    providedIn: 'root'
})
export class AuthDataService {
    get(): any {
        return timer(1000).pipe(mapTo(users));
    }
    getAll(): any {
        return timer(1000).pipe(mapTo(users));

    }
    search(username: string, password: string) {
        let user = users.find(value => (value.username === username && value.password === password));
        localStorage.setItem('currentUser', JSON.stringify(user));
        return timer(1000).pipe(mapTo(Boolean(user)));
    }
    change(id: number, item: any) {
        let user    : any = users.find(value => (value.id === id));
        let position: number = users.indexOf(user);
        console.log(position, item)
        users[position] = item;
        

        return timer(1000).pipe(mapTo(Boolean(true)));
    }
    post(item: any): any {
        return timer(1).pipe(mapTo(true));
    }
}