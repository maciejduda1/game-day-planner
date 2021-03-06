import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { EventModalComponent } from '../event-modal/event-modal.component';

import * as fromMainStore from '../store';
import * as fromAuthStore from '../../authentication/store';

import { Observable } from 'rxjs';
import { GameEvent } from 'src/app/models/game-event.model';

interface CalendarObjectCreator {
	daysInMonth: number;
	firstDayofMonth: number;
	lastDayofMonth: number;
	rows: number[];
}

@Component({
	selector: 'app-events-calendar',
	templateUrl: './events-calendar.component.html',
	styleUrls: ['./events-calendar.component.scss'],
})
export class EventsCalendarComponent implements OnInit {
	daysTable = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SO', 'ND'];
	calendar: CalendarObjectCreator;
	dateRef = moment();
	eventsArray$: Observable<GameEvent[]>;
	eventsObject: object;
	calendarFrameObject: object;

	constructor(
		public dialog: MatDialog,
		private mainStore: Store<fromMainStore.MainState>,
		private authStore: Store<fromAuthStore.AuthState>,
	) {}

	ngOnInit() {
		this.eventsArray$ = this.mainStore.select(fromMainStore.getEventsList);
		this.eventsArray$.subscribe((events) => {
			let test = {};
			if (!!events) {
				events.map((element: GameEvent) => {
					test = {
						...test,
						[element.date]: element,
					};
				});
				this.eventsObject = test;
			}
			this.calendar = this.createCalendar();
		});
	}

	elemHoveredCatch(d): void {}

	openDialog(): void {
		const dialogRef = this.dialog.open(EventModalComponent, {
			minWidth: '650px',
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}

	createCalendar(n?: number): CalendarObjectCreator {
		const currentDate = this.dateRef.add(n || 0, 'months');
		this.dateRef = moment(currentDate);
		const daysInMonth = currentDate.daysInMonth();
		const firstDayofMonth = currentDate.date(1).day();
		const lastDayofMonth = currentDate.date(daysInMonth).day();
		this.calendar = {
			daysInMonth: daysInMonth,
			firstDayofMonth: firstDayofMonth,
			lastDayofMonth: lastDayofMonth,
			rows: [1, 2, 3, 4, 5, 6],
		};
		this.createMonth();
		return this.calendar;
	}

	createMonth() {
		let calendarFrame = {};
		for (let i = 0; i <= 42; i++) {
			if (
				i < this.calendar.firstDayofMonth ||
				i > this.calendar.daysInMonth + this.calendar.firstDayofMonth
			) {
				calendarFrame = {
					...calendarFrame,
					[i]: {
						day: 0,
					},
				};
			} else if (
				this.eventsObject &&
				(this.eventsObject[
					`${
						i + 1 - this.calendar.firstDayofMonth
					}-${this.dateRef.format('MM-YY')}`
				] ||
					this.eventsObject[
						`0${
							i + 1 - this.calendar.firstDayofMonth
						}-${this.dateRef.format('MM-YY')}`
					])
			) {
				calendarFrame = {
					...calendarFrame,
					[i]: {
						day: i + 1 - this.calendar.firstDayofMonth,
						event: true,
					},
				};
			} else {
				calendarFrame = {
					...calendarFrame,
					[i]: {
						day: i + 1 - this.calendar.firstDayofMonth,
						event: false,
					},
				};
			}
		}
		this.calendarFrameObject = calendarFrame;
	}
}
