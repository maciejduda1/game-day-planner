import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';

import * as fromRouterStore from '../../store';
import * as fromAuthStore from '../../authentication/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

// loginState$: Observable<boolean>;
@Input()
loginState: any;

  constructor(private routerStore: Store<fromRouterStore.State>, private authStore: Store<fromAuthStore.AuthState>) { }

  ngOnInit() {
    // this.loginState$ = this.authStore.select(fromAuthStore.getLoginState);
    // this.loginState$.subscribe( value => this.loginState = value);
    // console.log('user: ', this.loginState);
  }

  goAuthenticate() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main', 'auth']}));
  }

  logoutUser() {
    this.authStore.dispatch( new fromAuthStore.Logout);
    console.log('nav działa');
  }

  goMain() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main']}));
  }

  goProfile() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main', 'profile']}));
  }

}
