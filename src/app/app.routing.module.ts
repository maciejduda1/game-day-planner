// import { AuthGuard } from './login/guards/auth.guard';
// import { LoginFormComponent } from './login/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';

import * as fromRouterStore from './store';

import {
	AngularFireAuthGuard,
	hasCustomClaim,
	redirectUnauthorizedTo,
	redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['auth']);

const appRoutes: Routes = [
	{ path: '', redirectTo: 'main', pathMatch: 'full' },
	{
		path: 'auth',
		loadChildren:
			'./authentication/authentication.module#AuthenticationModule',
	},
	{
		path: 'main',
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectToLogin },
		loadChildren: './main/main.module#MainModule',
	},
	{ path: '**', redirectTo: 'main' },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
