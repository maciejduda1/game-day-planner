import { Directive } from '@angular/core';
import {
	NG_VALIDATORS,
	Validator,
	AbstractControl,
	ValidatorFn,
} from '@angular/forms';

@Directive({
	selector: '[appAcceptedLinkFormat]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: AcceptedLinkFormatDirective,
			multi: true,
		},
	],
})
export class AcceptedLinkFormatDirective implements Validator {
	constructor() {}

	validate(control: AbstractControl): { [key: string]: any } | null {
		return this.patternValidator()(control);
	}

	patternValidator(): ValidatorFn {
		const acceptedLinkFormats = [
			'jpeg',
			'gif',
			'png',
			'apng',
			'svg',
			'bmp',
		];
		return (control: AbstractControl): { [key: string]: any } => {
			if (!control.value) {
				return null;
			}
			const selectedLinkFormat = control.value.split('.').pop();
			const valid =
				acceptedLinkFormats.indexOf(selectedLinkFormat) !== -1;
			return valid ? null : { invalidFormat: true };
		};
	}
}
