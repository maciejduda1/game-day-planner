import { HttpInterceptorService } from './services/http-interceptor-service.service';
import { SearchApiService } from './services/searchApi.service';
import { AuthService } from './authentication/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
	StoreRouterConnectingModule,
	RouterStateSerializer,
} from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, effects, CustomSerializer } from './store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import {
	AngularFirestoreModule,
	FirestoreSettingsToken,
} from '@angular/fire/firestore';
import { FooterComponent } from './footer/footer.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { reducers as authReducers } from './authentication/store';

// const environment = {
//   development: true,
//   production: false,
// };

export const metaReducers: MetaReducer<any>[] = !environment.production
	? [storeFreeze]
	: [];

@NgModule({
	declarations: [AppComponent, FooterComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AppRoutingModule,
		HttpClientModule,
		MatSnackBarModule,
		StoreModule.forRoot({ ...reducers, ...authReducers }, { metaReducers }),
		EffectsModule.forRoot(effects),
		StoreRouterConnectingModule,
		!environment.production ? StoreDevtoolsModule.instrument() : [],
	],
	providers: [
		{ provide: RouterStateSerializer, useClass: CustomSerializer },
		{ provide: FirestoreSettingsToken, useValue: {} },
		AngularFireAuth,
		AuthService,
		SearchApiService,
		AngularFireAuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
