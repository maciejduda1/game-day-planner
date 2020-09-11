import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTextAvatarSectionComponent } from './comment-text-avatar-section.component';

describe('AvatarCommentComponent', () => {
	let component: CommentTextAvatarSectionComponent;
	let fixture: ComponentFixture<CommentTextAvatarSectionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CommentTextAvatarSectionComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CommentTextAvatarSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
