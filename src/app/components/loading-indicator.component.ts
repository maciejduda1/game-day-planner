import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-loading',
	template: `
		<p class="text-primary w-100">Loading...</p>
		<div class="lds-hourglass text-center w-100"></div>
	`,
	styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
