import { BgCalendarComponent } from './bg-calendar/bg-calendar.component';
import { MainService } from './services/main.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationModule } from './../authentication/authentication.module';
import { MainRoutingModule } from './main.routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MainComponent } from './main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TopListComponent } from './top-list/top-list.component';
import { FooterComponent } from './footer/footer.component';
import { UserTopListComponent } from './user-top-list/user-top-list.component';
import { reducers, effects } from './store';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { EventModalComponent } from './event-modal/event-modal.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { GamedayPlannerMainComponent } from './gameday-planner-main/gameday-planner-main.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';

// import { reducers, effects } from './store';

@NgModule({
  declarations: [
    // NavigationComponent,
    // InvoiceListComponent,
    // InvoiceDialogComponent,
    MainComponent,
    NavigationComponent,
    TopListComponent,
    ProfileComponent,
    FooterComponent,
    UserTopListComponent,
    EventsCalendarComponent,
    EventModalComponent,
    EventDetailsComponent,
    GamedayPlannerMainComponent,
    BgCalendarComponent,
    CommentsSectionComponent,
  ],
  imports: [
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
    // MatToolbarModule,

    MatCardModule,
    StoreModule.forFeature('main', reducers),
    EffectsModule.forFeature(effects),
    MatDialogModule,
    // FormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    MatButtonModule,
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
  entryComponents: [
    EventModalComponent
  ],
  exports: [

  ],
  providers: [
    MainService
  ]

})

export class MainModule { }
