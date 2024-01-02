import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.sass'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesViewComponent {

}
