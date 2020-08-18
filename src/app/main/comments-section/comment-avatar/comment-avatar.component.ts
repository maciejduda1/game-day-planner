import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-comment-avatar',
	templateUrl: './comment-avatar.component.html',
	styleUrls: ['./comment-avatar.component.scss'],
})
export class CommentAvatarComponent implements OnInit {
	@Input() avatarURL: string;
	@Input() userName: string;

	constructor() {}

	ngOnInit() {}
}
