import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import * as fromRouterStore from '../../store';
import * as fromAuthStore from '../store';
import { Observable } from 'rxjs';

interface LoginForm {
	email: string;
	password: string;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	model: LoginForm = {
		email: '',
		password: '',
	};

	$isLoading: Observable<boolean>;
	isLoading: boolean;

	serverError$: Observable<string>;
	serverError: string;

	constructor(
		private routerStore: Store<fromRouterStore.State>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.serverError$ = this.authStore.select(fromAuthStore.getServerError);
		this.serverError$.subscribe((value) => (this.serverError = value));
		console.log(this.serverError);

		this.$isLoading = this.authStore.select(
			fromAuthStore.getIsLoadingSelector,
		);

		this.$isLoading.subscribe((loading: boolean) => {
			this.isLoading = loading;
		});
	}

	goRegister() {
		this.routerStore.dispatch(
			new fromRouterStore.Go({ path: ['auth', 'register'] }),
		);
	}

	onSubmit() {
		this.routerStore.dispatch(
			new fromAuthStore.Login({
				email: this.model.email,
				password: this.model.password,
			}),
		);
	}
}
