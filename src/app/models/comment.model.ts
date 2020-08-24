export class UserComment {
	comment: string;
	creationDate: Date;
	creatorId: string;
	answers?: UserComment[];
}
