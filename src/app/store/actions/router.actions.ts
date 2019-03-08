import { NavigationExtras } from '@angular/router/public_api';
import { Action } from '@ngrx/store';

export const GO = '[Router] GO';
export const BACK = '[Router] BACK';
export const FORWARD = '[Router] FORWARD';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export type Actions = Go | Back | Forward;
