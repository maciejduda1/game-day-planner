export class BoardGame {
	id: string;
	name: string;
	thumb_url: string;
	designers: string[];
	score?: number;
	user_scores?: { [id: string]: number };
	users_connected?: string[];
}
