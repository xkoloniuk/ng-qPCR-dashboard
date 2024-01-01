import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {qPCRFile} from "../../views/shell/shell.component";
import {select, Store} from "@ngrx/store";
import {selectFilesByTarget} from "../../app/store/app.selectors";
import {Observable} from "rxjs";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {TargetCardComponent} from "../target-card/target-card.component";

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
export class ListViewComponent implements OnInit{
public target?;

  public plates$?: Observable<qPCRFile[]>;
  public tableData: qPCRFile[] = [];

  constructor(private store: Store, private route: ActivatedRoute) {
  this.target = this.route.snapshot.paramMap.get('targetName');

}

  ngOnInit(){
    if (this.target) {

    this.store.pipe(select(selectFilesByTarget(this.target))).subscribe(data => this.tableData = data)
    }
    console.log(this.tableData)
    // this.plates$ = this.store.pipe(select(selectFilesBySample(this.sample)))
    }



}
