import {GraphXScaleType} from '../enums/GraphXScaleType';

export interface IGraphParameters {
  color: (d: any) => string;
  scaleType: GraphXScaleType;
  ticks: number;
  ticksFormatter: (d: any) => string;
  dateFormatString: string;
}
