import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DecimalPipe, JsonPipe, NgClass } from '@angular/common';
import { qPCRrecord } from '../../interfaces/interface';
import { isNumber } from 'lodash';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { TargetTagComponent } from '../target-tag/target-tag.component';

@Component({
  selector: 'app-well-template',
  standalone: true,
  imports: [
    JsonPipe,
    DecimalPipe,
    TagModule,
    CardModule,
    NgClass,
    BadgeModule,
    TargetTagComponent,
  ],
  templateUrl: './well-template.component.html',
  styleUrl: './well-template.component.scss',
  host: {
    '(click)': 'showWellInfo()',
    '[style.--card-background]': 'cardBackground',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WellTemplateComponent {
  private _wellValue = {} as qPCRrecord;

  public get wellValue() {
    return this._wellValue;
  }

  @Input()
  set wellValue(value: qPCRrecord) {
    this._wellValue = extractValues(value);
  }

  public get cardBackground() {
    switch (this._wellValue.content) {
      case 'NTC':
        return 'lightgrey';
      case 'NRT':
        return 'lightgreen';
      case 'NC':
        return 'lightpink';
      case 'PC':
      case 'Pos Ctrl':
        return 'green';
      default:
        return 'white';
    }
  }

  public get wellType() {
    switch (this._wellValue.content) {
      case 'NTC':
        return sampleType.NTC;
      case 'NRT':
        return sampleType.NRT;
      case 'NC':
        return sampleType.NC;
      case 'PC':
      case 'Pos Ctrl':
        return sampleType.PC;
      default:
        return sampleType.UNKNOWN;
    }
  }

  public get isControl() {
    return this._wellValue.content !== 'Unkn';
  }

  public showWellInfo() {
    console.log(this.wellValue);
  }
}

function extractValues(value: qPCRrecord) {
  const cq = !!value && isNumber(value.cq) ? +value.cq : '';
  const tm =
    !!value && !!value.meltTemperature && isNumber(value.meltTemperature)
      ? +value.meltTemperature
      : '';
  return {
    ...value,
    cq,
    meltTemperature: tm,
  } as qPCRrecord;
}

enum sampleType {
  NRT = 'NRT',
  NTC = 'NTC',
  NC = 'NC',
  PC = 'PC',
  UNKNOWN = 'UNKNOWN',
}
