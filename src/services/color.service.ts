import { Injectable } from '@angular/core';
import { distinctColors } from '../variables/colors';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colours = distinctColors;

  private mapTargetColor: Map<string, string> = new Map();

  public generatePalette(key: string) {
    if (!key) return undefined;
    if (this.mapTargetColor.has(key)) return this.mapTargetColor.get(key);

    const currentItemIndex = this.mapTargetColor.size;
    const currentColour = this.getColour(currentItemIndex);

    this.mapTargetColor.set(key, currentColour);
    return currentColour;
  }

  public resetPalette() {
    this.mapTargetColor = new Map();
  }

  public getPalette() {
    return this.mapTargetColor;
  }

  private getColour(i: number) {
    if (this.colours.length < i) {
      return this.colours[i % this.colours.length];
    }
    return this.colours[i];
  }
}
