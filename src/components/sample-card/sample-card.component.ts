import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { AsyncPipe } from '@angular/common';
import { GlobalState } from '../../app/store_xs/store.state';
import { Store } from '@ngxs/store';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sample-card',
  templateUrl: './sample-card.component.html',
  styleUrls: ['./sample-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChipModule,
    AsyncPipe,
    Button,
    InputTextModule,
    PaginatorModule,
    TableModule,
    RouterLink,
  ],
})
export class SampleCardComponent {
  selectedSample = input<string>('', { alias: 'sample' });
  #store = inject(Store);

  public sampleFiles$ = computed(() =>
    this.#store.select(GlobalState.selectFilesBySample(this.selectedSample())),
  );

  public onGlobalFilter($event: Event, samplesTable: Table) {
    const inputElement = $event.target as HTMLInputElement;
    samplesTable.filterGlobal(inputElement.value, 'contains');
  }

  public clear(table: Table) {
    table.clear();
  }
}
