import { Component, Input } from '@angular/core';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { NumberCqTmTemplateComponent } from '../number-cq-tm-template/number-cq-tm-template.component';

@Component({
  selector: 'app-well-template',
  standalone: true,
  imports: [JsonPipe, DecimalPipe, NumberCqTmTemplateComponent],
  templateUrl: './well-template.component.html',
  styleUrl: './well-template.component.scss',
})
export class WellTemplateComponent {
  @Input({ required: true }) wellValue: any;
}
