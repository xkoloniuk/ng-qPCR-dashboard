import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {qPCRFile} from "../../views/shell/shell.component";
import {select, Store} from "@ngrx/store";
import {selectFilesByTarget} from "../../app/store/app.selectors";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListViewComponent implements OnInit{
public target?;

  public plates$?: Observable<qPCRFile[]>;

  constructor(private store: Store, private route: ActivatedRoute) {
  this.target = this.route.snapshot.paramMap.get('targetName');

}

  ngOnInit(){
    if (this.target) {

    this.plates$ = this.store.pipe(select(selectFilesByTarget(this.target)))
    }
    console.log(this)
    // this.plates$ = this.store.pipe(select(selectFilesBySample(this.sample)))
    }



}
