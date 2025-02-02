import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetCardComponent } from '../target-card/target-card.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { qPCRFile } from '../../interfaces/interface';
import { GlobalState } from '../../app/store_xs/store.state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-targets-view',
  standalone: true,
  imports: [CommonModule, TargetCardComponent, RouterLink],
  templateUrl: './targets-view.component.html',
  styleUrl: './targets-view.component.scss',
})
export class TargetsViewComponent implements OnInit {
  public qpcrFiles$!: Observable<qPCRFile[]>;
  public samples$!: Observable<string[]>;
  public targets$!: Observable<string[]>;

  #store = inject(Store);

  ngOnInit() {
    this.qpcrFiles$ = this.#store.select(GlobalState.selectFiles);
    this.samples$ = this.#store.select(GlobalState.selectSamplesNames);
    this.targets$ = this.#store.select(GlobalState.selectTargetsNames);
  }
}
