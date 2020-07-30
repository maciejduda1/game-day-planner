import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultInCollectionComponent } from './search-result-in-collection.component';

describe('SearchResultInCollectionComponent', () => {
	let component: SearchResultInCollectionComponent;
	let fixture: ComponentFixture<SearchResultInCollectionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SearchResultInCollectionComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchResultInCollectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
