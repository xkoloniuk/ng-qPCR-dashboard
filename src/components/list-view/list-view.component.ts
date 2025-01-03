import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TargetCardComponent } from '../target-card/target-card.component';
import { qPCRFile } from '../../interfaces/interface';
import { Store } from '@ngxs/store';
import { GlobalState } from '../../app/store_xs/store.state';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    TableModule,
    DatePipe,
    RouterLink,
    TargetCardComponent,
  ],
})
export class ListViewComponent implements OnInit {
  public target?;
  public tableData!: qPCRFile[];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.target = this.route.snapshot.paramMap.get('targetName');
  }

  ngOnInit() {
    console.log(this.target);
    if (this.target) {
      this.tableData = this.store.selectSnapshot(
        GlobalState.selectFilesByTarget(this.target),
      );
    }
  }
}
