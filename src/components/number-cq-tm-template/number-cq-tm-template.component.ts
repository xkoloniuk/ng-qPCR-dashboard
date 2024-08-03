import { Component, inject, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-number-cq-tm-template',
  standalone: true,
  imports: [],
  providers: [DecimalPipe],
  templateUrl: './number-cq-tm-template.component.html',
  styleUrl: './number-cq-tm-template.component.scss',
})
export class NumberCqTmTemplateComponent {
  private decimalPipe = inject(DecimalPipe);
  private _value: number | string = '-';

  @Input()
  set value(value: number | string) {
    this._value = this.checkIfNumberAndProceed(+value);
  }

  get value() {
    return this._value;
  }

  private checkIfNumberAndProceed(value: number | string) {
    if (!value) {
      return '-';
    } else if (typeof value === 'number' && !isNaN(value)) {
      const transformedValue = this.decimalPipe.transform(value, '1.0-1');
      return transformedValue !== null ? transformedValue : '-';
    } else if (typeof value !== 'string' && isNaN(value)) {
      return '-';
    } else {
      return value === '' ? '-' : value;
    }
  }
}
