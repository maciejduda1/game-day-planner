import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgCalendarComponent } from './bg-calendar.component';

describe('BgCalendarComponent', () => {
  let component: BgCalendarComponent;
  let fixture: ComponentFixture<BgCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
