import { ErrorComponentComponent } from './error-component/error-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [ErrorComponentComponent],
	imports: [CommonModule],
	exports: [ErrorComponentComponent],
})
export class ErrorHandlerModule {}
