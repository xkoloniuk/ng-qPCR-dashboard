import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {TargetCardComponent} from "../target-card/target-card.component";
import {qPCRFile} from "../../interfaces/interface";
import {Store} from "@ngxs/store";
import {GlobalState} from "../../app/store_xs/store.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    TableModule,
    DatePipe,
    RouterLink,
    TargetCardComponent
  ],
})
export class ListViewComponent implements OnInit {
  public target?;
  public tableData$!: Observable<qPCRFile[]>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.target = this.route.snapshot.paramMap.get('targetName');
  }

  ngOnInit() {
    if (this.target) {
      this.tableData$ = this.store.select(GlobalState.selectFilesByTarget(this.target))
    }
  }


}
