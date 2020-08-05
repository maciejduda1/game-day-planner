import { Directive, Input } from '@angular/core';
import {
	NG_VALIDATORS,
	Validator,
	ValidationErrors,
	FormGroup,
} from '@angular/forms';

@Directive({
	selector: '[appMatchPassword]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: MatchPasswordDirective,
			multi: true,
		},
	],
})
export class MatchPasswordDirective implements Validator {
	@Input('appMatchPassword') MatchPassword: string[] = [];

	constructor() {}

	validate(formGroup: FormGroup): ValidationErrors {
		return this.MatchPasswords(
			this.MatchPassword[0],
			this.MatchPassword[1],
		)(formGroup);
	}

	MatchPasswords(password: string, confirmPassword: string) {
		return (formGroup: FormGroup) => {
			const passwordControl = formGroup.controls[password];
			const confirmPasswordControl = formGroup.controls[confirmPassword];

			if (!passwordControl || !confirmPasswordControl) {
				return null;
			}

			if (
				confirmPasswordControl.errors &&
				!confirmPasswordControl.errors.passwordMismatch
			) {
				return null;
			}

			if (passwordControl.value !== confirmPasswordControl.value) {
				confirmPasswordControl.setErrors({ passwordMismatch: true });
			} else {
				confirmPasswordControl.setErrors(null);
			}
		};
	}
}
