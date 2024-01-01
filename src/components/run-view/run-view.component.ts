import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {qPCRFile} from "../../views/shell/shell.component";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {selectFileByFileName, selectFilesByTarget} from "../../app/store/app.selectors";
import {TableModule} from "primeng/table";
import {DecimalPipe, formatDate, formatNumber} from "@angular/common";


@Component({
  selector: 'app-run-view',
  templateUrl: './run-view.component.html',
  styleUrls: ['./run-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableModule,
    DecimalPipe
  ]
})
export class RunViewComponent implements OnInit {
  public fileName?;

  public plate$?: Observable<qPCRFile>;
  public tableData?: any;
  public tableColumns?: string[];

  constructor(private store: Store, private route: ActivatedRoute) {
    this.fileName = this.route.snapshot.paramMap.get('runName');
  }

  ngOnInit() {
    if (this.fileName) {

      this.store.pipe(select(selectFileByFileName(this.fileName))).subscribe(data => {
        if (data?.data !== undefined) {
          // console.log(data)
          this.tableData = data.data
        }
        if (data !== undefined) {
          this.tableColumns = data.columns
        }
      })
    }
    console.log(this.tableData)
    // this.plates$ = this.store.pipe(select(selectFilesBySample(this.sample)))
  }

  public customNumFormat(wellElement: string) {
    if (wellElement === 'NaN' || wellElement === '') {
      return ''
    } else if ((typeof +wellElement === 'number') && !Number.isNaN(+wellElement)) {
      return Number(wellElement).toFixed(1)
    } else {
      return ''
    }
  }
}
