import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { qPCRFile } from '../../interfaces/interface';
import { GlobalState } from '../../app/store_xs/store.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.sass'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgIf, RouterLink],
})
export class TargetCardComponent implements OnInit {
  @Input() target: string = '';

  private store = inject(Store);

  public platesByTarget$!: Observable<qPCRFile[]>;

  ngOnInit() {
    console.log(this.target);
    // this.plates$ = this.store.pipe(select(selectFilesByTarget(this.target))).pipe(tap(files => {
    this.platesByTarget$ = this.store.select(
      GlobalState.selectFilesByTarget(this.target),
    );
    this.store
      .select(GlobalState.selectFilesByTarget(this.target))
      .subscribe((data) => console.log(data));

    console.log(
      this.store.selectSnapshot(GlobalState.selectFilesByTarget(this.target)),
    );
    //   .pipe(tap(files => {
    //
    //   const samplesSet: Set<string> = new Set()
    //   this.reactions = 0;
    //
    //   files.forEach(file => {
    //     // console.log(file)
    //     // get all unique samples
    //     const indexOfSample = file.columns.indexOf('Sample')
    //     file.counts.uniqueSamples.forEach(sample => samplesSet.add(sample))
    //
    //     // calculate all reactions
    //
    //     this.reactions += file.data.filter(wellData => wellData.Target === this.target && wellData.Sample !== 'NTC' && wellData.Sample !== '').length;
    //
    //   })
    //
    //   samplesSet.delete('NTC')
    //   samplesSet.delete('NRT')
    //   samplesSet.delete('')
    //   this.samples = samplesSet.size
    //
    // }))
  }

  openListView() {}
}
