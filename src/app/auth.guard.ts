import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FeathersService} from './feathers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private feathers: FeathersService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.feathers.authenticate()
      .then(x => {
        console.log('you are logged in', x);
        return true;
      })
      .catch(x => {
        console.log('you are not logged in');
        this.router.navigate(['/login']);
        return false;
      });
  }
}
