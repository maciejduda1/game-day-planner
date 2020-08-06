import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRouterStore from '../../store';
import * as fromAuthStore from '../store';
import { Observable } from 'rxjs';

interface RegisterForm {
	email: string;
	username: string;
	password: string;
	rePassword: string;
	avatarUrl: string;
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	@ViewChild('avatarUrl') avatarUrl: NgModel;

	model: RegisterForm = {
		email: '',
		username: '',
		password: '',
		rePassword: '',
		avatarUrl: '',
	};
	wrongPassword = false;
	serverError$: Observable<string>;
	serverError: string;

	$isLoading: Observable<boolean>;
	isLoading: boolean;

	constructor(
		private routerStore: Store<fromRouterStore.State>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.wrongPassword = false;

		this.serverError$ = this.authStore.select(fromAuthStore.getServerError);
		this.serverError$.subscribe((value) => (this.serverError = value));

		this.$isLoading = this.authStore.select(
			fromAuthStore.getIsLoadingSelector,
		);

		this.$isLoading.subscribe((loading: boolean) => {
			this.isLoading = loading;
		});
	}

	onSubmit() {
		this.authStore.dispatch(
			new fromAuthStore.Register({
				name: this.model.username,
				email: this.model.email,
				password: this.model.password,
				avatarUrl: this.avatarUrl.errors ? '' : this.model.avatarUrl,
			}),
		);
	}

	goLogin() {
		this.routerStore.dispatch(new fromRouterStore.Go({ path: ['auth'] }));
	}
}
