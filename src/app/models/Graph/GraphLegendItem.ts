import {IGraphLegendItem} from '../../interfaces/IGraphLegendItem';

export class GraphLegendItem implements IGraphLegendItem {
  name: string;
  color: string;
  currentValue: number;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
    this.currentValue = -1;
  }
}
