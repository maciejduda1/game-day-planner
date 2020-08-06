import { ComponentsModule } from './../components/components.module';

import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutesModule } from './profile.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [ProfileComponent],
	imports: [
		CommonModule,
		ProfileRoutesModule,
		FormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		ComponentsModule,
		MatCardModule,
		MatProgressSpinnerModule,
	],
	providers: [],
})
export class ProfileModule {}
