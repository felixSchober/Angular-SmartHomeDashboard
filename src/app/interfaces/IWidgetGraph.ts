import * as d3 from 'd3';
import {IGraphLegendItem} from './IGraphLegendItem';
import {IGraphMargins} from './IGraphMargins';
import {IGraphParameters} from './IGraphParameters';
import {IGraphValues} from './IGraphValues';
import {IWidget} from './IWidget';

export interface IWidgetGraph extends IWidget {
  values: IGraphValues[];
  d3GraphId: string;
  graphHeight: number;
  graphWidth: number;
  graphMargins: IGraphMargins;
  graphParameterDictionary: IGraphParameters;
  colorScale: (d: any) => string;
  xScale: any;
  yScale: any;
  showLegend: boolean;
  legendItems: IGraphLegendItem[];
  svgElement: d3.Selection<any, any, any, any>;
  xAxis: any;
  yAxis: any;
  graphWasBuild: boolean;
}
