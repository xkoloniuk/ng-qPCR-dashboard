import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {qPCRFile, qPCRrecord} from "../../interfaces/interface";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {selectFiles, selectFilesByTarget} from "../../app/store/app.selectors";
import {NgForOf} from "@angular/common";

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
    this.store.pipe(select(selectFiles)).subscribe(files => {

      files.forEach(file => {
          file.counts.uniqueSamples.forEach(sample => this.samples.add(sample))

        file.data.forEach( row => {
            const key = row.Sample
            const sample  = this.countsPerSample?.find(rec => rec.sample === key)
            if (sample) {
              ++sample.count
            } else {
              this.countsPerSample?.push({sample: key, count: 1})
            }
          })
        }
      )
        console.log(this.countsPerSample)


    })
  }


}
