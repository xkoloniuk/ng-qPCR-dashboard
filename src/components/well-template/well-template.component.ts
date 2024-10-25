import { Component, inject, Input, OnDestroy } from '@angular/core';
import { DecimalPipe, JsonPipe, NgClass } from '@angular/common';
import { qPCRrecord } from '../../interfaces/interface';
import { isNumber } from 'lodash';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-well-template',
  standalone: true,
  imports: [JsonPipe, DecimalPipe, TagModule, CardModule, NgClass, BadgeModule],
  templateUrl: './well-template.component.html',
  styleUrl: './well-template.component.scss',
  host: {
    '[class.control-sample]': 'isControl',
  },
})
export class WellTemplateComponent implements OnDestroy {
  public background = 'none';
  #colorService = inject(ColorService);

  private _wellValue = {} as qPCRrecord;

  public get wellValue() {
    return this._wellValue;
  }

  @Input()
  set wellValue(value: qPCRrecord) {
    this._wellValue = extractValues(value);
    const targetColor = this.#colorService.generatePalette(value.Target);
    this.background = targetColor || 'none';
  }

  public get wellType() {
    switch (this._wellValue.Content) {
      case 'NTC':
        return sampleType.NTC;
      case 'NRT':
        return sampleType.NRT;
      case 'NC':
        return sampleType.NC;
      case 'PC':
        return sampleType.PC;
      default:
        return sampleType.UNKNOWN;
    }
  }

  public get isControl() {
    return this._wellValue.Content !== 'Unkn';
  }

  public ngOnDestroy(): void {
    this.#colorService.resetPalette();
  }
}

function extractValues(value: qPCRrecord) {
  const Cq = !!value && isNumber(value.Cq) ? +value.Cq : '';
  const tm =
    !!value &&
    !!value['Melt Temperature'] &&
    isNumber(value['Melt Temperature'])
      ? +value['Melt Temperature']
      : '';
  return {
    ...value,
    Cq,
    'Melt Temperature': tm,
  } as qPCRrecord;
}

enum sampleType {
  NRT = 'NRT',
  NTC = 'NTC',
  NC = 'NC',
  PC = 'PC',
  UNKNOWN = 'UNKNOWN',
}
