import { CollectionRoutingModule } from './collection.routing.module';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { reducers, effects } from './store';
import { UserTopListComponent } from './user-top-list/user-top-list.component';
import { SearchResultInCollectionComponent } from './search-result-in-collection/search-result-in-collection.component';
import { ScoreSelectComponent } from './score-select/score-select.component';
import { TopGamesService } from './services/top-games.service';

@NgModule({
	declarations: [
		CollectionComponent,
		UserTopListComponent,
		SearchResultInCollectionComponent,
		ScoreSelectComponent,
	],
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		ComponentsModule,
		FormsModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		CollectionRoutingModule,
		MatProgressSpinnerModule,
		StoreModule.forFeature('collection', reducers),
		EffectsModule.forFeature(effects),
	],
	providers: [TopGamesService],
})
export class CollectionModule {}
