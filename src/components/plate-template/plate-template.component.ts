import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { WellTemplateComponent } from '../well-template/well-template.component';
import { Store } from '@ngxs/store';
import { qPCRFile, qPCRrecord } from '../../interfaces/interface';
import { GlobalState } from '../../app/store_xs/store.state';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-plate-template',
  standalone: true,
  imports: [WellTemplateComponent, AsyncPipe],
  templateUrl: './plate-template.component.html',
  styleUrl: './plate-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlateTemplateComponent {
  public rows = 'ABCDEFGH'.split('');
  public columns = Array.from({ length: 12 }, (_, i) => i + 1);

  public runName = input<string>('');

  #store = inject(Store);

  public mappedPlateData$ = computed(() => {
    return this.#store
      .select(GlobalState.selectFileByFileName(this.runName()))
      .pipe(map(this.transformWellData));
  });

  private transformWellData(data: qPCRFile | undefined) {
    const mapByWellId: Map<string, qPCRrecord> = new Map();
    if (data !== undefined) {
      data?.data.forEach((well: qPCRrecord) => {
        mapByWellId.set(well.well, well);
      });
    }

    return mapByWellId;
  }
}
