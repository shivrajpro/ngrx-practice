import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-app';
  showLoading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.showLoading = this.store.select(getLoading);
  }
}
