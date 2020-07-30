import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
	@Output() newSearch = new EventEmitter<string>();
	constructor() {}

	ngOnInit() {}

	onSearch(searchForm: NgForm) {
		const value: string = searchForm.value.searchText;
		this.newSearch.emit(value);
	}
}
