import { BoardGame } from './../../models/game.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
	@Output() selectedGame = new EventEmitter<BoardGame>();

	@Input() game: BoardGame;
	@Input() disableGameAdd: boolean;
	@Input() displayLoading: boolean;

	constructor() {}

	ngOnInit() {}

	onClick(game: BoardGame) {
		this.selectedGame.emit(game);
	}
}
