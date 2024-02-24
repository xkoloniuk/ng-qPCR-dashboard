import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {qPCRFile} from "../../interfaces/interface";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Store} from "@ngxs/store";
import {GlobalState} from "../../app/store_xs/store.state";

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
    this.store.select(GlobalState.selectSamplesNames).subscribe(samples => {
    // if(samples.length) {
    // }
    } )
  }


  getPlatesCount(sample: string) {
    // return this.store.pipe(select(selectFilesBySample(sample))).subscribe(data => data.length);
    return this.store.select(GlobalState.selectFilesBySample(sample)).subscribe(data => data.length);
  }
}
