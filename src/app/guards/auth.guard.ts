import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){ }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let is_active = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (!this.isEmpty(is_active)) {
      return true;
    }
    console.log("🕵️‍♀️¡Acceso restringido!🕵️‍♀️")
    this.router.navigate(['/login']);
    return false;
  }
  /**
	 * 
	 * @param obj 
	 * @returns 
	 */
	isEmpty(obj: any): boolean {
		// for(let key in obj) if(obj.hasOwnProperty(key)) return false;
		for(let key in obj)
			return false;
		return true;
	}

}
