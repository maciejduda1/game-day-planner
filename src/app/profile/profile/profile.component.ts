import { Store, select } from '@ngrx/store';
import { DatabaseAuthUser } from '../../models/user.model';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

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
export class ProfileComponent implements OnInit, OnDestroy {
	allSubs: Subscription[] = [];

	edit = false;
	isLoading: boolean;
	isLoading$: Observable<boolean>;
	isLoadingSubscription: Subscription;

	updateSuccess: boolean;
	updateSuccess$: Observable<boolean>;
	updateSuccessSubscription: Subscription;

	model: AvatarNameModel = {
		userName: '',
		avatarUrl: '',
	};

	userId$: Observable<null | string>;

	userData$: Observable<DatabaseAuthUser>;
	userData: DatabaseAuthUser;
	userDataSubscription: Subscription;

	constructor(private authStore: Store<fromAuthStore.AuthState>) {}

	ngOnInit() {
		this.userData$ = this.authStore.pipe(select(fromAuthStore.getUserRole));

		this.userData$.subscribe((userData) => {
			this.userData = userData;
			this.model.avatarUrl = userData.photoURL;
			this.model.userName = userData.userName;
		});

		this.isLoading$ = this.authStore.pipe(
			select(fromAuthStore.getIsLoadingSelector),
		);
		this.isLoadingSubscription = this.isLoading$.subscribe(
			(isLoading: boolean) => (this.isLoading = isLoading),
		);

		this.updateSuccess$ = this.authStore.pipe(
			select(fromAuthStore.getUpdatingProfileSuccessSelector),
		);
		this.updateSuccessSubscription = this.updateSuccess$.subscribe(
			(success: boolean) => {
				this.updateSuccess = success;
				if (success) {
					this.model = { userName: '', avatarUrl: '' };
					this.edit = false;
				}
			},
		);

		this.allSubs = [
			this.isLoadingSubscription,
			this.updateSuccessSubscription,
		];
	}

	onSubmit() {
		const userName = this.model.userName;
		const avatarUrl = this.model.avatarUrl;

		this.authStore.dispatch(
			new fromAuthStore.ProfileUpdate(userName, avatarUrl),
		);
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

	ngOnDestroy() {
		this.allSubs.forEach((sub: Subscription) => sub.unsubscribe());
	}
}
