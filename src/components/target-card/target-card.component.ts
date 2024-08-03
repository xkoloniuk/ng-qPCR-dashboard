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
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgIf, RouterLink],
})
export class TargetCardComponent implements OnInit {
  @Input() target: string = '';

  private store = inject(Store);
  public platesByTarget$!: Observable<qPCRFile[]>;
  public reactionsByTarget$!: Observable<number>;

  ngOnInit() {
    this.platesByTarget$ = this.store.select(
      GlobalState.selectFilesByTarget(this.target),
    );

    this.reactionsByTarget$ = this.store
      .select(GlobalState.selectFilesByTarget(this.target))
      .pipe(
        map((files) => {
          const uniqueSamplesWithTarget: Set<string> = new Set();
          let reactions = 0;

          files.forEach((file) => {
            const reactionsWithTarget = file.data.filter(
              (wellData) => wellData.Target === this.target,
            );

            // calculate all reactions
            reactions += reactionsWithTarget.length;

            // get all unique samples
            reactionsWithTarget.forEach((reaction) =>
              uniqueSamplesWithTarget.add(reaction.Sample),
            );
          });
          return reactions;
        }),
      );
  }
}
