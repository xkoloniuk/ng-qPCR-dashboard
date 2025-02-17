import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { qPCRFile } from '../../interfaces/interface';
import { Store } from '@ngxs/store';
import { GlobalState } from '../../app/store_xs/store.state';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, DatePipe, RouterLink, Button],
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
