import { ComponentsModule } from './../components/components.module';
import { BgCalendarComponent } from './bg-calendar/bg-calendar.component';
import { MainService } from './services/main.service';
import { AuthenticationModule } from './../authentication/authentication.module';
import { MainRoutingModule } from './main.routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
// import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MainComponent } from './main.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { reducers, effects } from './store';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { EventModalComponent } from './event-modal/event-modal.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { GamedayPlannerMainComponent } from './gameday-planner-main/gameday-planner-main.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewsPanelComponent } from './news-panel/news-panel.component';
import { SingleEventComponent } from './single-event/single-event.component';
import { MatIconModule } from '@angular/material/icon';
import { GamesProposedComponent } from './comments-section/games-proposed/games-proposed.component';
import { SingleGamePropositionComponent } from './comments-section/games-proposed/single-game-proposition/single-game-proposition.component';
import { CommentsComponent } from './comments-section/comments/comments.component';
import { AddCommentComponent } from './comments-section/add-comment/add-comment.component';
import { CommentComponent } from './comments-section/comments/comment/comment.component';
import { CommentAvatarComponent } from './comments-section/comment-avatar/comment-avatar.component';
import { CommentTextAvatarSectionComponent } from './comments-section/comment-text-avatar-section/comment-text-avatar-section.component';

// import { reducers, effects } from './store';

@NgModule({
	declarations: [
		NavigationComponent,
		// InvoiceListComponent,
		// InvoiceDialogComponent,
		MainComponent,
		EventsCalendarComponent,
		EventModalComponent,
		EventDetailsComponent,
		GamedayPlannerMainComponent,
		BgCalendarComponent,
		CommentsSectionComponent,
		NewsPanelComponent,
		SingleEventComponent,
		GamesProposedComponent,
		SingleGamePropositionComponent,
		CommentsComponent,
		AddCommentComponent,
		CommentComponent,
		CommentAvatarComponent,
		CommentTextAvatarSectionComponent,
	],
	imports: [
		ComponentsModule,
		MainRoutingModule,
		CommonModule,
		FormsModule,
		MatGridListModule,
		MatToolbarModule,
		AuthenticationModule,
		MatInputModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatExpansionModule,
		MatMenuModule,
		NgxMaterialTimepickerModule,
		MatSlideToggleModule,
		MatProgressSpinnerModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		StoreModule.forFeature('main', reducers),
		EffectsModule.forFeature(effects),
		MatDialogModule,
		// FormsModule,
		// MatFormFieldModule,
		// MatInputModule,
		// MatRadioModule,
		// MatProgressBarModule,
		// MatSelectModule,
		// MatCheckboxModule,
		// MatButtonToggleModule,
		// MatTableModule,
		// MatSortModule,
		// MatPaginatorModule,
		// AppRoutingModule,
		// StoreModule.forFeature('main', reducers),
		// EffectsModule.forFeature(effects),
	],
	entryComponents: [EventModalComponent],
	exports: [],
	providers: [MainService],
})
export class MainModule {}
