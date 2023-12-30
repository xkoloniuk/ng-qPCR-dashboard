import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.sass'],
  standalone: true

})
export class TargetCardComponent {
  @Input() target: string = ''
  @Input() samples?: number = 0
  }
