import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe, NgForOf } from '@angular/common';
import { Store } from '@ngxs/store';
import { ChipModule } from 'primeng/chip';
import { GlobalState } from '../../app/store_xs/store.state';
import { TagModule } from 'primeng/tag';
import { Table, TableModule } from 'primeng/table';
import { map, switchMap } from 'rxjs/operators';
import { qPCRFile, SampleCount } from '../../interfaces/interface';
import { combineLatest } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    ChipModule,
    AsyncPipe,
    TagModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    Button,
    InputTextModule,
    FormsModule,
    RouterLink,
  ],
})
export class SamplesViewComponent {
  public searchValue = '';
  #store = inject(Store);
  public samples$ = this.#store
    .select(GlobalState.selectFiles)
    .pipe(
      map(this.getUniqueSamples),
      switchMap(this.getSampleCountObs.bind(this)),
    );

  public clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  public onGlobalFilter($event: Event, samplesTable: Table) {
    const inputElement = $event.target as HTMLInputElement;

    samplesTable.filterGlobal(inputElement.value, 'contains');
  }

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
