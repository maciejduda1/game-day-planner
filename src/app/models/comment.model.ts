export class UserComment {
	commentId: string;
	comment: string;
	creationDate: Date;
	creatorId: string;
	creatorName: string;
	creatorAvatar?: string;
	answers?: UserComment[];
}
