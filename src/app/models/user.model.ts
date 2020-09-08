export class DatabaseAuthUser {
	userName: string;
	uid: string;
	photoURL?: string;
	email: string;
}
export class User extends DatabaseAuthUser {
	events?: string[];
	scores?: {
		[gameId: string]: number;
	};
	favorites?: string[];
}
