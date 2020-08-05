import { ErrorHandlerModule } from './../error-handler/error-handler.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthenticationRoutingModule } from './authentication.routing.module';
import { RegisterComponent } from './register/register.component';
import { reducers, effects } from './store';

@NgModule({
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		FormsModule,
		StoreModule.forFeature('auth', reducers),
		EffectsModule.forFeature(effects),
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		ErrorHandlerModule,
		MatProgressSpinnerModule,
	],
	declarations: [LoginComponent, RegisterComponent],
	providers: [],
})
export class AuthenticationModule {}
