import { Component } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-sample-card',
  templateUrl: './sample-card.component.html',
  styleUrls: ['./sample-card.component.scss'],
  standalone: true,
  imports: [ChipModule, NgIf, NgForOf, AsyncPipe],
})
export class SampleCardComponent {}
