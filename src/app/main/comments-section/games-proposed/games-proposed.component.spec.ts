import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesProposedComponent } from './games-proposed.component';

describe('GamesProposedComponent', () => {
  let component: GamesProposedComponent;
  let fixture: ComponentFixture<GamesProposedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesProposedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesProposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
