import { DocumentChangeAction } from '@angular/fire/firestore';
import { User } from './../../models/user.model';
import { UserComment } from 'src/app/models/comment.model';
import { MainService } from './../services/main.service';
import { GameEvent } from 'src/app/models/game-event.model';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromMainStore from '../store';
import * as fromRoot from '../../store';
import * as fromAuthStore from '../../authentication/store';

import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {
gameEvent: GameEvent;
commentsList: object;
commentsArray: UserComment[];
eventList: object;
user$: Observable<User>;
user: User;
// eventSelected: GameEvent;
eventId: string;
commentMode = false;
eventSelectedforComment = -1;
selectedEvent: number;

  constructor(
    private mainStore: Store<fromMainStore.MainState>,
    private mainService: MainService,
    private rootStore: Store<fromRoot.State>,
    private authStore: Store<fromAuthStore.AuthState>
    ) { }

  ngOnInit() {

    this.rootStore.select( fromRoot.getRouterState).subscribe(
      router => this.eventId = router.state.params.gameDayId
    );

    this.mainService.getEventComments(this.eventId).subscribe(
      res => {
        let allCommentsData = {};
        res.map(
          comment => {
            const commentData = comment.payload.doc.data();
            const id = comment.payload.doc.id;
            allCommentsData = {...allCommentsData, [id]: commentData };
          });
          // console.log('to jest info: ', this.commentsArray);
        return this.mainStore.dispatch( new fromMainStore.GetCommentsSuccess(this.eventId, allCommentsData));
      }
    );

    this.user$ = this.authStore.select(fromAuthStore.getUserRole);
    this.user$.subscribe(
      userData => this.user = userData
    );

    this.mainStore.select( fromMainStore.getSelectedGameDayData).subscribe(
      (gameData: GameEvent) => {
        this.gameEvent = gameData;
        if (gameData && gameData.comments !== undefined) {
         // console.log('test commentów ', !!gameData.comments, '  ', gameData.comments );
         this.commentsArray = Object.keys(gameData.comments)
          .map( key => gameData.comments[key])
          .sort( (a, b) => {
            if (!!a.creationDate && !!b.creationDate) {
              return a.creationDate.seconds - b.creationDate.seconds;
            } else {
              return -1000000;
            }
          });
         console.log('test commentów 2222222 ', this.commentsArray);
        } else {
          this.mainService.events$.subscribe(
            ( events: DocumentChangeAction<GameEvent>[]) =>  {
               // console.log('event ', events);
               const eventDataChange = events.map( (event: DocumentChangeAction<GameEvent>) => {
                 return {...event.payload.doc.data(), eventId: event.payload.doc.id};
               });
               this.mainStore.dispatch( new fromMainStore.GetEventsSuccess(eventDataChange));
             }
           );
        }
      }
    );
  }

  addComment(comment: NgForm, event: GameEvent) {
    // console.log('data add comments: ', event);
    const commentObject: UserComment = {
      comment: comment.value.comment,
      eventId: event.eventId,
      creatorId: event.creatorUid,
      creatorName: event.creator,
      creatorAvatar: this.user.photoURL
    };
    this.toggleComment();
    this.mainStore.dispatch( new fromMainStore.AddComment(commentObject));
  }

  toggleComment() {
    this.commentMode = !this.commentMode;
  }

}
