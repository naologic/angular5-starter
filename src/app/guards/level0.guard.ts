import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 *   Level0Guard is the mandatory top level guard for all the application
 *      -- any root route should be checked against leve0
 *      -- for custom roles (teams etc) add extra guards
 */

@Injectable()
export class Level0Guard implements CanLoad, CanActivate {
    constructor() {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return Promise.resolve(true);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return Promise.resolve(true);
    }
}
