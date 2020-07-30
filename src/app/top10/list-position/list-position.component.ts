import { BoardGame } from './../../models/game.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-list-position',
	templateUrl: './list-position.component.html',
	styleUrls: ['./list-position.component.scss'],
})
export class ListPositionComponent implements OnInit {
	@Input() class: string;
	@Input() game: BoardGame;
	@Input() position: number;

	constructor() {}

	ngOnInit() {}
}
