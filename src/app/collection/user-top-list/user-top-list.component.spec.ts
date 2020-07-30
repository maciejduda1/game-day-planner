import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTopListComponent } from './user-top-list.component';

describe('UserTopListComponent', () => {
  let component: UserTopListComponent;
  let fixture: ComponentFixture<UserTopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
