import { Component, Input } from '@angular/core';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { qPCRrecord } from '../../interfaces/interface';
import { isNumber } from 'lodash';

@Component({
  selector: 'app-well-template',
  standalone: true,
  imports: [JsonPipe, DecimalPipe],
  templateUrl: './well-template.component.html',
  styleUrl: './well-template.component.scss',
})
export class WellTemplateComponent {
  private _wellValue = {} as qPCRrecord;

  @Input()
  set wellValue(value: qPCRrecord | undefined) {
    const Cq = !!value && isNumber(value.Cq) ? +value.Cq : '';
    const tm =
      !!value &&
      !!value['Melt Temperature'] &&
      isNumber(value['Melt Temperature'])
        ? +value['Melt Temperature']
        : '';

    this._wellValue = { Cq, 'Melt Temperature': tm } as qPCRrecord;
  }

  get wellValue() {
    return this._wellValue;
  }
}
