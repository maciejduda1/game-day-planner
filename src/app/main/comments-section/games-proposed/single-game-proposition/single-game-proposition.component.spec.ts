import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGamePropositionComponent } from './single-game-proposition.component';

describe('SingleGamePropositionComponent', () => {
  let component: SingleGamePropositionComponent;
  let fixture: ComponentFixture<SingleGamePropositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGamePropositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGamePropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
