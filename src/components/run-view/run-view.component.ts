import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { qPCRrecord } from '../../interfaces/interface';
import { Store } from '@ngxs/store';
import { GlobalState } from '../../app/store_xs/store.state';
import { TagModule } from 'primeng/tag';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type TagSeverity =
  | 'success'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'danger'
  | 'contrast';

@Component({
  selector: 'app-run-view',
  templateUrl: './run-view.component.html',
  styleUrls: ['./run-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, MultiSelectModule, FormsModule, TagModule],
})
export class RunViewComponent implements OnInit {
  public fileName?;

  public tableData: qPCRrecord[] = [];
  public tableColumns?: string[];
  public targets?: any[];
  public samples?: any[];

  protected severityBySampleType = new Map<string, TagSeverity>([
    ['Unkn', 'info'],
    ['NTC', 'warning'],
    ['NRT', 'danger'],
    ['Pos Ctrl', 'success'],
  ]);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private DestroyRef: DestroyRef,
  ) {
    this.fileName = this.route.snapshot.paramMap.get('runName');
  }

  ngOnInit() {
    if (this.fileName) {
      this.store
        .select(GlobalState.selectFileByFileName(this.fileName))
        .pipe(takeUntilDestroyed(this.DestroyRef))
        .subscribe((data) => {
          if (data !== undefined) {
            this.tableData = [...data.data];
            this.tableColumns = data.columns;
            this.targets = data.counts.uniqueTargets;
            this.samples = data.counts.uniqueSamples;
          }
        });
    }
  }

  public customNumFormat(wellElement: string) {
    if (wellElement === 'NaN' || wellElement === '') {
      return '';
    } else if (
      typeof +wellElement === 'number' &&
      !Number.isNaN(+wellElement)
    ) {
      return Number(wellElement).toFixed(1);
    } else {
      return '';
    }
  }
}
