import { Top10Component } from './top10.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const top10Routes: Routes = [
	{
		path: '',
		component: Top10Component,
	},
];

@NgModule({
	imports: [RouterModule.forChild(top10Routes)],
	exports: [RouterModule],
	providers: [],
})
export class Top10RoutingModule {}
