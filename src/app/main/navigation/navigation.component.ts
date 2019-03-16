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

  }

  goAuthenticate() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main', 'auth']}));
  }

  logoutUser() {
    this.authStore.dispatch( new fromAuthStore.Logout);
  }

  goMain() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main']}));
  }

  goProfile() {
    this.routerStore.dispatch( new fromRouterStore.Go({path: ['main', 'profile']}));
  }

}
