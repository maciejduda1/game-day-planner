import { DatabaseAuthUser } from './models/user.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './authentication/services/auth.service';

import * as fromAuthStore from './authentication/store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	gotUser = false;

	constructor(
		private authService: AuthService,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.authService.checkLoginState();
		this.authService.getUser().subscribe((user: DatabaseAuthUser) => {
			if (user) {
				this.gotUser = true;
				return this.authStore.dispatch(
					new fromAuthStore.LoginSuccess(user),
				);
			}
		});
	}
}
