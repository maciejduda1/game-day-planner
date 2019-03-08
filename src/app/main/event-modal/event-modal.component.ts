import { User } from './../../models/user.model';
import { GameEvent } from './../../models/game-event.model';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EventsCalendarComponent } from '../events-calendar/events-calendar.component';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import * as fromMainStore from '../store';
import * as fromAuthStore from '../../authentication/store';
import { Observable, from } from 'rxjs';
import { database } from 'firebase';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {
  gamesProposed: string[];
  user$: Observable<User>;
  user: User;
  editMode = false;
  constructor(
    public dialogRef: MatDialogRef<EventsCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameEvent,
    public mainStore: Store<fromMainStore.MainState>,
    public authStore: Store<fromAuthStore.AuthState>
    ) { }

  ngOnInit() {
    console.log('data modal ', this.data);
    if (this.data) {
      this.editMode = !this.editMode;
    }
    this.gamesProposed = ['1'];
    this.authStore.select(fromAuthStore.getUserRole).subscribe(
      role => this.user = role
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addOption() {
    this.gamesProposed = [...this.gamesProposed, `${this.gamesProposed.length}`];
  }

  onSubmit(form: NgForm) {
    console.log(this.editMode);

    const gameEvent: GameEvent = {
      date: form.value.date ? form.value.date.format('DD-MM-YY') : this.data.date,
      name: form.value.name || this.data.name,
      creator: this.user.userName,
      creatorUid: this.user.uid,
      games: [(form.value.game1 || this.data.games[0]), (form.value.game2 || this.data.games[1]), (form.value.game3 || this.data.games[2])]
    };
    if (this.editMode) {
      this.mainStore.dispatch( new fromMainStore.AddEvent(gameEvent));
    } else if (!this.editMode) {
      this.editMode = !this.editMode;
      const editForm = { ...gameEvent, eventId: this.data.eventId };
      this.mainStore.dispatch( new fromMainStore.EditEvent(editForm));
    }
  }
}
