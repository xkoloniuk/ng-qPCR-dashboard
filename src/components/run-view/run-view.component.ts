import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {qPCRFile, qPCRrecord} from "../../views/shell/shell.component";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {selectFileByFileName,} from "../../app/store/app.selectors";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-run-view',
  templateUrl: './run-view.component.html',
  styleUrls: ['./run-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableModule,
    MultiSelectModule,
    FormsModule,
  ]
})
export class RunViewComponent implements OnInit {
  public fileName?;

  public plate$?: Observable<qPCRFile>;
  public tableData: qPCRrecord[] = [];
  public tableColumns?: string[];
  objectsArray?: any;
  targets?: any[];
  samples?: any[];

  constructor(private store: Store, private route: ActivatedRoute) {
    this.fileName = this.route.snapshot.paramMap.get('runName');
  }

  ngOnInit() {
    if (this.fileName) {

      this.store.pipe(select(selectFileByFileName(this.fileName))).subscribe(data => {
    console.log(this.tableData)
        if (data?.data !== undefined) {
          // console.log(data)
          this.tableData = [...data.data]
        }
        if (data !== undefined) {
          this.tableColumns = data.columns
          this.targets = data.counts.uniqueTargets
          this.samples = data.counts.uniqueSamples
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
