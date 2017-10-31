import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../providers/user/user.service';



export class AuthGuard implements CanLoad, CanActivate {
    constructor(
        private user: UserService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.user.hasTokenFake)
            return true;
        else {
            this.router.navigate(['login']);
            return false;
        }
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        if (this.user.hasTokenFake)
            return true;
        else {
            this.router.navigate(['login']);
            return false;
        }
    }
}
