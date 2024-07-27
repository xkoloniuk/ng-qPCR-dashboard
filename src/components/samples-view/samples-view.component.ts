import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {qPCRFile, qPCRrecord} from "../../interfaces/interface";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {
  selectFiles,
  selectFilesBySample,
  selectFilesByTarget,
  selectSamplesNames
} from "../../app/store/app.selectors";
import {NgForOf} from "@angular/common";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.sass'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf
  ]
})
export class SamplesViewComponent implements OnInit {
  public samples = new Set<string>();
  public tableData: qPCRFile[] = [];
  public countsPerSample?: {sample: string, count: number}[] = [];


  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.pipe(select(selectFiles)).subscribe(samples => {
      samples.forEach(sample => sample.counts.uniqueSamples.forEach(this.samples.add, this.samples))

      this.samples.forEach(sample => this.getPlatesCount(sample) )
    } )



  }


  getPlatesCount(sample: string) {
    return this.store.pipe(select(selectFilesBySample(sample)));
  }
}
