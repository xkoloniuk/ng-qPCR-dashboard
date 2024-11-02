import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-target-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './target-tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-3rem',
  },
})
export class TargetTagComponent implements OnDestroy {
  public target = input('');
  #colorService = inject(ColorService);

  public bgColor = computed(() => {
    return this.#colorService.generatePalette(this.target());
  });

  public ngOnDestroy(): void {
    this.#colorService.resetPalette();
  }
}
