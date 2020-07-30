import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-error-component',
	templateUrl: './error-component.component.html',
	styleUrls: ['./error-component.component.scss'],
})
export class ErrorComponentComponent implements OnInit {
	@Input() errorMessage: string;

	constructor() {}

	ngOnInit() {}
}
