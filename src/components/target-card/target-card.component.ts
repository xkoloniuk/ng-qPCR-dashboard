import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {selectFiles, selectFilesByTarget} from "../../app/store/app.selectors";
import {select, Store} from "@ngrx/store";
import {AsyncPipe, NgIf} from "@angular/common"
import {map, Observable, tap} from "rxjs";
import {qPCRFile} from "../../views/shell/shell.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.sass'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgIf,
    RouterLink
  ],

})
export class TargetCardComponent implements OnInit {
  @Input() target: string = '';

  private store = inject(Store)

  plates$?: Observable<qPCRFile[]>
  reactions$?: Observable<qPCRFile[]>

  public samples: number = 0;
  public reactions: number = 0;

  ngOnInit() {
    this.plates$ = this.store.pipe(select(selectFilesByTarget(this.target))).pipe(tap(files => {

      const samplesSet: Set<string> = new Set()
      this.reactions = 0;

      files.forEach(file => {
        // console.log(file)
        // get all unique samples
        const indexOfSample = file.columns.indexOf('Sample')
        file.counts.uniqueSamples.forEach(sample => samplesSet.add(sample))

        // calculate all reactions

        this.reactions += file.data.filter(wellData => wellData.Target === this.target && wellData.Sample !== 'NTC' && wellData.Sample !== '').length;

      })

      samplesSet.delete('NTC')
      samplesSet.delete('NRT')
      samplesSet.delete('')
      this.samples = samplesSet.size

    }))
  }


  openListView() {

  }
}
