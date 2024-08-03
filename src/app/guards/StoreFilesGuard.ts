import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalState } from '../store_xs/store.state';

@Injectable({
  providedIn: 'root',
})
export class StoreValuesGuard implements CanActivate {
  #store = inject(Store);
  #router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return this.#store.select(GlobalState.selectFiles).pipe(
      take(1),
      map((files) => {
        if (files === undefined || files.length === 0) {
          // Redirect to root if any value is null
          return this.#router.createUrlTree(['/']);
        }
        return true;
      }),
    );
  }
}
