import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { qPCRFile } from '../../interfaces/interface';

import { ActivatedRoute } from '@angular/router';

import { AsyncPipe, NgForOf } from '@angular/common';
import { Store } from '@ngxs/store';
import { ChipModule } from 'primeng/chip';
import { GlobalState } from '../../app/store_xs/store.state';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, ChipModule, AsyncPipe, TagModule],
})
export class SamplesViewComponent implements OnInit {
  public samples = new Set<string>();
  public tableData: qPCRFile[] = [];
  public countsPerSample?: { sample: string; count: number }[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.select(GlobalState.selectFiles).subscribe((files: any) => {
      files.forEach((file: any) =>
        file.counts.uniqueSamples.forEach(this.samples.add, this.samples),
      );

      this.samples.forEach((sample) => this.getPlatesCount(sample));
    });
  }

  getPlatesCount(sample: string) {
    return this.store.select(GlobalState.selectFilesBySample(sample));
  }
}
