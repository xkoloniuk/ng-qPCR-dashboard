import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe, NgForOf } from '@angular/common';
import { Store } from '@ngxs/store';
import { ChipModule } from 'primeng/chip';
import { GlobalState } from '../../app/store_xs/store.state';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { map, switchMap } from 'rxjs/operators';
import { qPCRFile, SampleCount } from '../../interfaces/interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, ChipModule, AsyncPipe, TagModule, TableModule],
})
export class SamplesViewComponent {
  #store = inject(Store);

  public samples$ = this.#store
    .select(GlobalState.selectFiles)
    .pipe(
      map(this.getUniqueSamples),
      switchMap(this.getSampleCountObs.bind(this)),
    );

  private getSampleCountObs(samples: string[]) {
    const obs = samples.map((sample) =>
      this.#store.select(GlobalState.selectFilesBySample(sample)).pipe(
        map(
          (files): SampleCount => ({
            sample,
            count: files.length,
          }),
        ),
      ),
    );

    return combineLatest(obs);
  }

  private getUniqueSamples(files: qPCRFile[]): string[] {
    const uniqueSamplesSet = new Set<string>([]);
    files.forEach((file: qPCRFile) =>
      file.counts.uniqueSamples.forEach(uniqueSamplesSet.add, uniqueSamplesSet),
    );

    return Array.from(uniqueSamplesSet);
  }
}
