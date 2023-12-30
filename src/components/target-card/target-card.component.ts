import {Component, inject, Input, OnInit} from '@angular/core';
import {selectFiles, selectFilesByTarget} from "../../app/store/app.selectors";
import {select, Store} from "@ngrx/store";
import {AsyncPipe, NgIf} from "@angular/common"
import {map, Observable} from "rxjs";
import {qPCRFile} from "../../views/shell/shell.component";

@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.sass'],
  imports: [
    AsyncPipe,
    NgIf
  ],
  standalone: true

})
export class TargetCardComponent implements OnInit{
  @Input() target: string = '';

  private store = inject(Store)

  ssampless$?: Observable<qPCRFile[]>

  ngOnInit (){
  this.ssampless$ = this.store.pipe(select(selectFilesByTarget(this.target)))
  // ssampless$ = this.store.pipe(select(selectFiles))

  }


}
