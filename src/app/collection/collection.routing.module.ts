import { NgModule } from '@angular/core';
import { CollectionComponent } from './collection.component';
import { Routes, RouterModule } from '@angular/router';

const collectionRoutes: Routes = [
	{
		path: '',
		component: CollectionComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(collectionRoutes)],
	exports: [RouterModule],
	providers: [],
})
export class CollectionRoutingModule {}
