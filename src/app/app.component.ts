import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResetState } from './store_xs/store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'ng-q-dashboard';
  #store = inject(Store);
  public resetStore() {
    this.#store.dispatch(new ResetState());
  }
}
