import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromMainStore from './store';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
	constructor(private mainStore: Store<fromMainStore.MainState>) {}

	ngOnInit() {
		this.mainStore.dispatch(new fromMainStore.GetEvents());
	}
}
