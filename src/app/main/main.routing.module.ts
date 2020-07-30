import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { GamedayPlannerMainComponent } from './gameday-planner-main/gameday-planner-main.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';

const mainRoutes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: '', component: GamedayPlannerMainComponent },
			{
				path: 'profile',
				loadChildren: '../profile/profile.module#ProfileModule',
			},
			{
				path: 'collection',
				loadChildren:
					'../collection/collection.module#CollectionModule',
			},
			{
				path: 'top',
				loadChildren: '../top10/top10.module#Top10Module',
			},
			{ path: 'event/:gameDayId', component: CommentsSectionComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(mainRoutes)],
	exports: [RouterModule],
	providers: [],
})
export class MainRoutingModule {}
