import { Store } from '@ngrx/store';
import { BoardGame } from './../../models/game.model';
import { MainService } from '../../main/services/main.service';
import { DatabaseAuthUser } from '../../models/user.model';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import * as fromAuthStore from '../../authentication/store';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	edit = false;

	userId$: Observable<null | string>;

	userData$: Observable<DatabaseAuthUser>;
	userData: DatabaseAuthUser = {
		userName: '',
		uid: '',
		photoURL: '',
		email: '',
	};

	constructor(
		private mainService: MainService,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.userData$ = this.authStore.select(fromAuthStore.getUserRole);
		this.userData$.subscribe((userData) => (this.userData = userData));
	}

	onSubmit(form: NgForm) {
		const formData = {
			displayName: form.value.name,
			photoURL: form.value.photoURL,
		};

		const { displayName, photoURL } = formData;
		this.mainService.changeUserData(displayName || '', photoURL || '');
	}

	editPersonalDataToggle() {
		this.edit = !this.edit;
	}
}
