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
    console.log('this is a value: ', value);
    this._value = this.checkIfNumberAndProceed(+value);
  }

  get value() {
    return this._value;
  }

  private checkIfNumberAndProceed(value: number) {
    if (isNaN(value)) {
      console.log('Value is NaN', value);
      return '-';
    } else {
      const transformedValue = this.decimalPipe.transform(value, '1.0-1');
      console.log('transformed value: ', value);
      return transformedValue !== null ? transformedValue : '-';
    }
  }
}
