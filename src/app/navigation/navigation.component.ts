import { DatabaseAuthUser } from './../models/user.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromRouterStore from '../store';
import * as fromAuthStore from '../authentication/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	user$: Observable<DatabaseAuthUser>;
	user: DatabaseAuthUser;

	constructor(
		private routerStore: Store<fromRouterStore.State>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.user$ = this.authStore.select(fromAuthStore.getUserRole);
		this.user$.subscribe((userData) => (this.user = userData));
	}

	goAuthenticate() {
		this.routerStore.dispatch(new fromRouterStore.Go({ path: ['auth'] }));
	}

	logoutUser() {
		this.authStore.dispatch(new fromAuthStore.Logout());
	}

	goMain() {
		this.routerStore.dispatch(new fromRouterStore.Go({ path: ['main'] }));
	}

	goCollection() {
		this.routerStore.dispatch(
			new fromRouterStore.Go({ path: ['main', 'collection'] }),
		);
	}

	goTop() {
		this.routerStore.dispatch(
			new fromRouterStore.Go({ path: ['main', 'top'] }),
		);
	}

	goProfile() {
		this.routerStore.dispatch(
			new fromRouterStore.Go({ path: ['main', 'profile'] }),
		);
	}
}
