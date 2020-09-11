import { UserComment } from 'src/app/models/comment.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-comment-text-avatar-section',
	templateUrl: './comment-text-avatar-section.html',
	styleUrls: ['./comment-text-avatar-section.scss'],
})
export class CommentTextAvatarSectionComponent implements OnInit {
	@Input() comment: UserComment;

	constructor() {}

	ngOnInit() {}
}
