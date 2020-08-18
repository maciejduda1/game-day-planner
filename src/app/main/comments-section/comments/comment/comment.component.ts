import { UserComment } from './../../../../models/comment.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
	@Input() comment: UserComment = new UserComment();

	replyIndicator = false;

	constructor() {}

	ngOnInit() {}
}
