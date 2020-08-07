import { AuthService } from './../../authentication/services/auth.service';
import { Store } from '@ngrx/store';
import { BoardGame } from './../../models/game.model';
import { MainService } from '../../main/services/main.service';
import { DatabaseAuthUser } from '../../models/user.model';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import * as fromAuthStore from '../../authentication/store';

interface AvatarNameModel {
	userName: string;
	avatarUrl: string;
}

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	edit = false;
	isLoading: boolean;

	model: AvatarNameModel = {
		userName: '',
		avatarUrl: '',
	};

	userId$: Observable<null | string>;

	userData$: Observable<DatabaseAuthUser>;
	userData: DatabaseAuthUser;

	constructor(
		private authService: AuthService,
		private mainService: MainService,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.userData$ = this.authStore.select(fromAuthStore.getUserRole);

		this.userData$.subscribe((userData) => {
			this.userData = userData;
			this.model.avatarUrl = userData.photoURL;
			this.model.userName = userData.userName;
		});
	}

	onSubmit() {
		this.isLoading = true;
		this.mainService
			.changeUserData(this.model.userName, this.model.avatarUrl)
			.then((res) => {
				this.isLoading = false;
				this.authStore.dispatch(
					new fromAuthStore.ProfileUpdateSuccess({
						userName: this.model.userName,
						photoURL: this.model.avatarUrl,
					}),
				);
				this.editPersonalDataToggle();
			})
			.catch((er) => (this.isLoading = false));
	}

	editPersonalDataToggle() {
		if (this.edit) {
			this.resetForm();
		}
		this.edit = !this.edit;
	}

	resetForm() {
		this.model.avatarUrl = this.userData.photoURL;
		this.model.userName = this.userData.userName;
	}
}
