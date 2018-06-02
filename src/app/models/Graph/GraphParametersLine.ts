import {GraphXScaleType} from '../../enums/GraphXScaleType';
import {GraphParametersBase} from './GraphParametersBase';

export class GraphParametersLine extends GraphParametersBase {
  areaOpacity: number;

  constructor(scaleType?: GraphXScaleType,
              color?: (d: any) => string,
              ticks?: number,
              ticksFormatter?: (d: any) => string,
              areaOpacity?: number) {
    super(scaleType, color, ticks, ticksFormatter);
    this.areaOpacity = areaOpacity || 0.2;
  }
}
