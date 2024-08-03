import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { ResetState } from '../../app/store_xs/store.actions';
import { GlobalState } from '../../app/store_xs/store.state';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navigation-header',
  standalone: true,
  imports: [Button, RouterLink, AsyncPipe],
  templateUrl: './navigation-header.component.html',
  styleUrl: './navigation-header.component.scss',
})
export class NavigationHeaderComponent implements OnInit {
  #store = inject(Store);
  #router = inject(Router);
  public areThereAnyFiles$ = new BehaviorSubject<boolean>(false);
  private DestroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.#store
      .select(GlobalState.selectFiles)
      .pipe(takeUntilDestroyed(this.DestroyRef))
      .subscribe((data) => {
        this.areThereAnyFiles$.next(data.length > 0);
      });
  }

  public resetStore() {
    this.#store.dispatch(new ResetState());
    this.#router.navigate(['']);
  }
}
