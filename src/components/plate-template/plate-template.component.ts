import { Component, computed, OnInit, signal } from '@angular/core';
import { WellTemplateComponent } from '../well-template/well-template.component';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../app/store_xs/store.state';
import { qPCRrecord } from '../../interfaces/interface';

@Component({
  selector: 'app-plate-template',
  standalone: true,
  imports: [WellTemplateComponent],
  templateUrl: './plate-template.component.html',
  styleUrl: './plate-template.component.scss',
})
export class PlateTemplateComponent implements OnInit {
  public rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  public columns = Array.from({ length: 12 }, (_, i) => i + 1);

  public fileName?;
  public plateData = signal([] as qPCRrecord[]);

  public mappedPlateData = computed(() => {
    const mapByWellId: Map<string, qPCRrecord> = new Map([]);
    this.plateData().forEach((well: any) => mapByWellId.set(well.Well, well));
    return mapByWellId;
  });

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.fileName = this.route.snapshot.paramMap.get('runName');
  }

  ngOnInit() {
    if (this.fileName) {
      this.store
        .select(GlobalState.selectFileByFileName(this.fileName))
        .subscribe((data) => {
          if (data !== undefined) {
            this.plateData.set([...data.data]);
          }
        });
    }
  }
}
