import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchResultComponent } from './search-result/search-result.component';
import { MatCardModule } from '@angular/material/card';
import { AcceptedLinkFormatDirective } from './directives/accepted-link-format.directive';

@NgModule({
	declarations: [
		LoadingIndicatorComponent,
		ModalComponent,
		SearchBarComponent,
		SearchResultComponent,
		AcceptedLinkFormatDirective,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		MatCardModule,
	],
	exports: [
		LoadingIndicatorComponent,
		ModalComponent,
		SearchBarComponent,
		SearchResultComponent,
		AcceptedLinkFormatDirective,
	],
})
export class ComponentsModule {}
