import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import * as fromRouterStore from '../../store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private routerStore: Store<fromRouterStore.State>,
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		router: RouterStateSnapshot,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isAuthenticated = this.authService.isAuthenticated();
		if (isAuthenticated) {
			return true;
		} else {
			this.routerStore.dispatch(
				new fromRouterStore.Go({ path: ['auth'] }),
			);
		}

		// .pipe(
		// 	map((user) => {
		// 		console.log('UU ', user);
		// 		return !!user;
		// 	}),
		// 	tap((isAuth) => {
		// 		if (!isAuth) {
		// 			this.routerStore.dispatch(
		// 				new fromRouterStore.Go({ path: ['auth'] }),
		// 			);
		// 		}
		// 	}),
		// );
	}
}
