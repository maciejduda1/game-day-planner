import { UserComment } from './../../../models/comment.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
	@Input() commentsArray: UserComment[] = [];
	constructor() {}

	ngOnInit() {}
}
