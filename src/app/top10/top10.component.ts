import { BoardGame } from './../models/game.model';
import { Observable } from 'rxjs';
import { Top10Service } from './services/top10.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-top10',
	templateUrl: './top10.component.html',
	styleUrls: ['./top10.component.scss'],
})
export class Top10Component implements OnInit {
	topGames$: Observable<BoardGame[]>;
	topGames: BoardGame[];
	constructor(private topService: Top10Service) {}

	ngOnInit() {
		this.topGames$ = this.topService.getCollection();
		this.topGames$.subscribe((data) => (this.topGames = data));
	}

	getClass(i: number): string {
		if (i === 0) {
			return 'top';
		}
		if (i === 1) {
			return 'second';
		} else {
			return 'game';
		}
	}
}
