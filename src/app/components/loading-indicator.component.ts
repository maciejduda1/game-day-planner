import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-loading',
	template: ` <div class="lds-hourglass text-center w-100"></div> `,
	styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
