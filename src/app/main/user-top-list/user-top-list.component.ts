import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromMainStore from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-top-list',
  templateUrl: './user-top-list.component.html',
  styleUrls: ['./user-top-list.component.scss']
})
export class UserTopListComponent implements OnInit {

  searchResults$: Observable<object[]>;

  constructor(private mainStore: Store<fromMainStore.MainState>) { }

  ngOnInit() {
    // this.searchResults$ = this.mainStore.select( fromMainStore.getSearchResults);
  }

}
