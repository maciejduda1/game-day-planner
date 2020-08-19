import { BoardGame } from './../../../models/game.model';
import { Observable } from 'rxjs';
import { SearchApiService } from './../../../services/searchApi.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'app-games-proposed',
	templateUrl: './games-proposed.component.html',
	styleUrls: ['./games-proposed.component.scss'],
})
export class GamesProposedComponent implements OnInit, OnChanges {
	@Input() games: string[] = [];

	GamesResults$: Observable<BoardGame[]>;

	constructor(private apiService: SearchApiService) {}

	ngOnInit() {
		console.log('GAMES ', this.games);
	}

	ngOnChanges() {
		console.log('GAMES On Change', this.games);
		if (this.games) {
			this.GamesResults$ = this.apiService.getSelectedGames(this.games);
		}
	}
}
