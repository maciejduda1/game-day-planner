import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamedayPlannerMainComponent } from './gameday-planner-main.component';

describe('GamedayPlannerMainComponent', () => {
  let component: GamedayPlannerMainComponent;
  let fixture: ComponentFixture<GamedayPlannerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamedayPlannerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamedayPlannerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
