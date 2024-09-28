import { Component, Input } from '@angular/core';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { qPCRrecord } from '../../interfaces/interface';
import _ from 'lodash';

@Component({
  selector: 'app-well-template',
  standalone: true,
  imports: [JsonPipe, DecimalPipe],
  templateUrl: './well-template.component.html',
  styleUrl: './well-template.component.scss',
})
export class WellTemplateComponent {
  private _wellValue: { cq: null | number; tm: null | number } = {
    cq: null,
    tm: null,
  };

  @Input()
  set wellValue(value: qPCRrecord) {
    const cq = _.isNumber(value.Cq) ? +value.Cq : null;
    const tm =
      !!value['Melt Temperature'] && _.isNumber(value['Melt Temperature'])
        ? +value['Melt Temperature']
        : null;

    this._wellValue = { cq, tm };
  }

  get wellValue() {
    return this._wellValue;
  }
}
