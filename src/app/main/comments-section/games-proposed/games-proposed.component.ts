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

	searchingGames = false;

	GamesResults$: Promise<BoardGame[] | void>;

	constructor(private apiService: SearchApiService) {}

	ngOnInit() {}

	ngOnChanges() {
		if (this.games) {
			this.findGamesInAPI();
		}
	}

	findGamesInAPI() {
		this.searchingGames = true;
		this.GamesResults$ = this.apiService
			.getSelectedGames(this.games)
			.toPromise()
			.then((res) => {
				this.searchingGames = false;
				return res;
			})
			.catch((er) => {
				this.searchingGames = false;
				console.log('er ', er);
			});
	}
}
