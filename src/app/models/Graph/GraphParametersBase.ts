import {GraphXScaleType} from '../../enums/GraphXScaleType';
import {IGraphParameters} from '../../Interfaces/IGraphParameters';

export class GraphParametersBase implements IGraphParameters {
  color: (d: any) => string;
  scaleType: GraphXScaleType;
  ticks: number;
  ticksFormatter: (d: any) => string;
  dateFormatString: string;

  protected constructor(scaleType?: GraphXScaleType,
                        color?: (d: any) => string,
                        ticks?: number,
                        ticksFormatter?: (d: any) => string,
                        dateFormatString?: string) {
    this.scaleType = scaleType || GraphXScaleType.linear;
    this.color = color;
    this.ticks = ticks || 4;
    this.ticksFormatter = ticksFormatter;
    this.dateFormatString = dateFormatString || 'HH:mm';
  }
}
