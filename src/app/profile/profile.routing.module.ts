import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const profileRoutes: Routes = [
	{ path: '', component: ProfileComponent },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forChild(profileRoutes)],
	exports: [RouterModule],
	providers: [],
})
export class ProfileRoutesModule {}
