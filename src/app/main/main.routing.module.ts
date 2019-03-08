import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { GamedayPlannerMainComponent } from './gameday-planner-main/gameday-planner-main.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';


const mainRoutes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: 'auth', loadChildren: '../authentication/authentication.module#AuthenticationModule'},
    { path: 'profile', component: ProfileComponent},
    { path: '', component: GamedayPlannerMainComponent},
    { path: 'event/:gameDayId', component: CommentsSectionComponent}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [RouterModule],
  providers: []
})

export class MainRoutingModule {
}
