import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Store } from '@ngxs/store';
import { GlobalState } from '../../app/store_xs/store.state';
import { Observable } from 'rxjs';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.sass'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, AsyncPipe, ChipModule],
})
export class SamplesViewComponent implements OnInit {
  public samples$!: Observable<string[]>;
  #store = inject(Store);

  ngOnInit() {
    this.samples$ = this.#store.select(GlobalState.selectSamplesNames);
  }

  // getPlatesCount(sample: string) {
  //   // return this.store.pipe(select(selectFilesBySample(sample))).subscribe(data => data.length);
  //   return this.store.select(GlobalState.selectFilesBySample(sample)).subscribe(data => data.length);
  // }
}
