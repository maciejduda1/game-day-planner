import { BoardGame } from './../models/game.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface ApiSearchResponse {
	games: GameItem[];
}

export interface GameItem {
	id: string;
	name: string;
	year_published?: number;
	min_players: number;
	max_players: number;
	min_playtime: number;
	max_playtime: number;
	min_age: number;
	description: string;
	description_preview: string;
	image_url: string;
	thumb_url: string;
	images: Images;
	url: string;
	price: string;
	msrp: string;
	discount: string;
	primary_publisher: string;
	publishers: string[];
	mechanics: any[];
	categories: any[];
	designers: string[];
	developers: any[];
	artists: string[];
	names: string[];
	num_user_ratings: number;
	average_user_rating: number;
	official_url: string;
	rules_url: string;
	weight_amount: number;
	weight_units: string;
	size_height: number;
	size_width: number;
	size_depth: number;
	size_units: string;
	matches_specs?: any;
	spec: any[];
	reddit_all_time_count: number;
	reddit_week_count: number;
	reddit_day_count: number;
	historical_low_price: number;
	historical_low_date: Date;
}

export interface Images {
	thumb: string;
	small: string;
	medium: string;
	large: string;
	original: string;
}

@Injectable()
export class SearchApiService {
	bggURL = 'https://api.boardgameatlas.com/api/';
	constructor(public http: HttpClient) {}

	searchBggDatabase(title: string): Observable<BoardGame[]> {
		return this.http
			.get<ApiSearchResponse>(`${this.bggURL}search`, {
				params: new HttpParams()
					.set('name', title)
					.set('client_id', 'J1O6XoWmj8')
					.set('limit', '12')
					// .set('fields', 'id,name,thumb_url,designers')
					.set('fuzzy_match', 'true'),
			})
			.pipe(
				map((res: ApiSearchResponse) => {
					const resComb: BoardGame[] = res.games.map((game) => ({
						id: game.id,
						name: game.name,
						thumb_url: game.thumb_url,
						designers: game.designers,
					}));
					return resComb;
				}),
			);
	}

	getSelectedGames(ids: string[]): Observable<BoardGame[]> {
		return this.http
			.get<ApiSearchResponse>(`${this.bggURL}search`, {
				params: new HttpParams()
					.set('ids', ids.toString())
					.set('client_id', 'J1O6XoWmj8'),
			})
			.pipe(
				map((res: ApiSearchResponse) => {
					const resComb: BoardGame[] = res.games.map((game) => ({
						id: game.id,
						name: game.name,
						thumb_url: game.thumb_url,
						designers: game.designers,
					}));
					return resComb;
				}),
			);
	}
}
