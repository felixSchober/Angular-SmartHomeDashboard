import {WidgetType, Widget} from './widget';
import {WidgetAction} from './widgetAction';
import { Utils } from '../utils';
import * as d3 from 'd3';



export class WidgetGraph extends Widget {
  values: GraphValues[];
  graphType: WidgetGraphType;
  d3GraphId: string;
  graphHeight: number;
  graphWidth: number;
  graphMargins: Margins;
  graphParameterDictionary: WidgetGraphParameters;
  colorScale: (d: any) => string;
  xScale: any;
  yScale: any;
  showLegend: boolean;
  legendItems: LegendItem[];
  svgElement: d3.Selection<any>;
  xAxis: any;
  yAxis: any;
  curveFactory: any;
  graphWasBuild: boolean;

  constructor(name: string,
              title: string,
              graphType: WidgetGraphType,
              graphParameterDictionary: WidgetGraphParameters,
              margins?: Margins,
              subtitle?: string,
              dataPrefix?: string,
              dataSuffix?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string,
              cardHeaderColor?: string,
              showLegend?: boolean,
              actions?: WidgetAction[]) {
    super(name, title, WidgetType.Graph, subtitle, dataPrefix, dataSuffix, sizeX, sizeY, cardColor, cardHeaderColor, actions);
    this.graphType = graphType;
    this.graphWidth = this.cardWidth;
    this.graphHeight = this.cardHeight - 24;
    this.graphParameterDictionary = graphParameterDictionary;
    this.graphMargins = margins || new Margins(4, 20, 28, 4);
    this.showLegend = showLegend || true;
    this.legendItems = [];
    this.curveFactory = d3.curveBasis;
    this.graphWasBuild = false;

    if (!this.graphParameterDictionary) {
      // create default parameters
      if (this.graphType === WidgetGraphType.line) {
        this.graphParameterDictionary = new WidgetLineGraphParameters();
      }
    }
    this.values = [];
  }

  update(widget: Widget, data: any) {
    const widgetGraph = widget as WidgetGraph;

    // update values
    widgetGraph.values = data as GraphValues[];

    widgetGraph.updateLastUpdatedString();
    widgetGraph.redefineScales();
    widgetGraph.updateLegendItems(data);

    // create svg element if not already created
    if (!widgetGraph.svgElement) {
      widgetGraph.svgElement = widgetGraph.appendSvgElement();
      widgetGraph.buildLineGraph();
      return;
    }

    // update data
    if (widgetGraph.graphType === WidgetGraphType.line) {
      widgetGraph.applyLineGraphData();
    }

  }

  private applyLineGraphData() {

    console.log('apply line data change');

    const svg = this.svgElement;

    const lineGenerator = this.lineGenerator();
    const areaGenerator = this.areaGenerator();
    // Make the changes
    // change the line
    svg
      .selectAll('.line')
      .data(this.values)
      .transition()
      .duration(750)
      .attr('d', (d: any) => {
        const data = this.dataKeyFunction(d).data;
        return lineGenerator(data);
      });

    // change areas
    svg.selectAll('.areas')
      .data(this.values)
      .transition()
      .duration(750)
      .attr('d', (d: any) => {
        const data = this.dataKeyFunction(d).data;
        return areaGenerator(data);
      });
    svg.select('.x.axis') // change the x axis
      .transition()
      .duration(750)
      .call(this.xAxis);
    svg.select('.y.axis') // change the y axis
      .transition()
      .duration(750)
      .call(this.yAxis);
  }

  // should be called if the series change
  private redefineScales() {

    // UPDATE COLOR SCALE
    // use parameters color function if defined. If not then the d3 colors are used.
    if (this.graphParameterDictionary.color) {
      this.colorScale = this.graphParameterDictionary.color;
    } else {
      const colorScaleDomain: ReadonlyArray<string> = <ReadonlyArray<string>>this.values.map((e) => {
        return e.name as string;
      });
      this.colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(colorScaleDomain);
    }

    // UPDATE Y-axis
    this.calculateYScaleDomain(this.graphHeight);

    // UPDATE X-axis
    this.calculateXScaleDomain(this.graphWidth);
  }

  private calculateYScaleDomain(h: number) {
    if (!this.yScale) {
      const yRange: ReadonlyArray<number> = <ReadonlyArray<number>>[h, 0];
      this.yScale = d3.scaleLinear()
        .range(yRange);
    }

    // if no values are available yet, don't calculate domain
    if(!this.values) {
      return;
    }

    // get the maximum of the data values
    const maxSeriesValue = d3.max(this.values, (seriesData) => {
      // return max of the series
      return d3.max(seriesData.values, (d) =>  d );
    });
    this.yScale.domain([0, maxSeriesValue]);
  }

  private calculateXScaleDomain(w: number) {
    // if no values are available yet, don't calculate domain
    if(!this.values) {
      return;
    }

    const v = this.values;
    const rangeTuple: ReadonlyArray<number> = <ReadonlyArray<number>>[0, w];

    if (this.graphType === WidgetGraphType.line) {
      if (typeof v[0].labels[0] === 'string') {
        this.xScale = d3.scaleLinear()
          .range(rangeTuple)
          .domain([0, v[0].labels.length - 1]);
      } else if (v[0].labels[0] instanceof Date) {
        this.xScale = d3.scaleTime()
          .range(rangeTuple)
          .domain([v[0].labels[0], v[0].labels[v[0].labels.length - 1]]);
      } else {
        console.error('unknown label type.');
        throw new TypeError('unknown label type ' + typeof v[0].labels[0]);
      }
    }
  }

  private createGraphAxis() {
    const parameters = this.graphParameterDictionary as WidgetLineGraphParameters;

    if (!this.xAxis) {
      this.xAxis = d3.axisBottom(this.xScale).ticks(parameters.ticks);
    }

    if (!this.yAxis) {
      this.yAxis = d3.axisLeft(this.yScale)
        .ticks(parameters.ticks)
        .tickFormat((d) => {
          if (parameters.ticksFormatter) {
            return parameters.ticksFormatter(d);
          }
          return this.dataPrefix + Utils.toK(d as number) + this.dataSuffix;
        });
    }
  }

  private dataKeyFunction(d: any) {
    const result = {
      name: d.name,
      data: []
    };

    // zip values of labels and values together
    result.data = d.values.map((e, i) => {
      return {value: e, label: d.labels[i]};
    });
    return result;
  }

  private updateLegendItems(data: any) {
    // no elements so far
    if (!this.legendItems || this.legendItems.length !== data.length)  {
      this.legendItems = [];
      for (let i = 0; i < data.length; i++) {
        const series = data[i];
        const seriesColor = this.colorScale(series.name);
        const li = new LegendItem(series.name, seriesColor);
        li.currentValue = series.values[series.values.length - 1];
        this.legendItems.push(li);
      }
    } else { // update elements
      for (let i = 0; i < data.length; i++) {
        const legendItem = this.legendItems[i];
        const dataSeries = data[i];

        // series did not change only update most recent value
        if (legendItem.name === dataSeries.name) {
          legendItem.currentValue = dataSeries.values[dataSeries.values.length - 1];
        } else {
          const seriesColor = this.colorScale(dataSeries.name);
          this.legendItems[i] = new LegendItem(dataSeries.name, seriesColor);
          this.legendItems[i].currentValue = dataSeries.values[dataSeries.values.length - 1];
        }
      }
    }
  }

  private appendSvgElement(): d3.Selection<any>{
    // update card width based on d3 parent container element
    this.graphWidth = d3.select('#' + this.d3GraphId)
        .node()
        .getBoundingClientRect()
        .width - this.graphMargins.marginsX();

    return d3
      .select('#' + this.d3GraphId)
      .append('svg')
      .attr('id', 'svg-' + this.d3GraphId)
      .attr('width', this.graphWidth + this.graphMargins.left + this.graphMargins.right)
      .attr('height', this.graphHeight + this.graphMargins.top + this.graphMargins.bottom);
  }

  buildPointGraph() {
    /*
    const svg = this.appendSvgElement();
    const circles = svg.selectAll('circle')
      .data(this.values)
      .enter()
      .append('circle');

    //circles.attr('')*/
  }

  buildBarGraph() {
    /*
    const svg = this.appendSvgElement();
    const bars = svg.selectAll('rect')
      .data(this.values)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return i * 21;
      })
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 100);*/
  }

  private lineGenerator() {
    const parameters = this.graphParameterDictionary as WidgetLineGraphParameters;
    return d3.line()
      .curve(this.curveFactory)
      .x((d: any, i) => {
        if (parameters.scaleType === XScaleType.linear) {
          return this.xScale(i);
        }
        return this.xScale(d.label);
      })
      .y((d: any) => {
        return this.yScale(d.value);
      });
  }

  private areaGenerator() {
    const parameters = this.graphParameterDictionary as WidgetLineGraphParameters;

    return d3.area()
      .curve(this.curveFactory)
      .x((d: any, i) => {
        if (parameters.scaleType === XScaleType.linear) {
          return this.xScale(i);
        }
        return this.xScale(d.label);
      })
      .y0(this.graphHeight)
      .y1((d) => {
        return this.yScale(d.value);
      });
  }

  buildLineGraph() {
    if (!this.svgElement) {
      this.svgElement = this.appendSvgElement();
    }
    const svg = this.svgElement;
    const g = svg.append('g')
      .attr('transform', 'translate(' + this.graphMargins.left + ',' + this.graphMargins.top + ')');
    const w = this.graphWidth;
    const h = this.graphHeight;
    const parameters = this.graphParameterDictionary as WidgetLineGraphParameters;

    const lineGenerator = this.lineGenerator();
    const areaGenerator = this.areaGenerator();

    // calculate scales
    this.calculateXScaleDomain(w);
    this.calculateYScaleDomain(h);
    const zScale = this.colorScale;

    // get axis
    this.createGraphAxis();

    const areas = g.selectAll('.areas')
      .data(this.values)
      .enter()
      .append('path')
      .attr('class', 'areas')
      .style('opacity', parameters.areaOpacity)
      .style('fill', (d) => {
        return zScale(d.name);
      })
      .attr('d', (d) => {
        const data = this.dataKeyFunction(d).data;
        return areaGenerator(data);
      });

    const lines = g.selectAll('.dataPoints')
      .data(this.values)
      .enter()
      .append('g')
      .attr('class', 'dataPoints');

    lines.append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('d', (d: any) => {
        const data = this.dataKeyFunction(d).data;
        return lineGenerator(data);
      })
      .style('stroke', (d: any) => {
        return zScale(d.name);
      });

    // add x axis
    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + h + ')')
      .call(this.xAxis);

    // add y axis
    g.append('g')
        .attr('class', 'y axis')
        .call(this.yAxis);
  }


}

export abstract class WidgetGraphParameters {
  color: (d: any) => string;


  constructor(color: (d: any) => string) {
    this.color = color;
  }
}

export class WidgetLineGraphParameters extends WidgetGraphParameters {
  ticks: number;
  ticksFormatter: (d: any) => string;
  areaOpacity: number;
  scaleType: XScaleType;

  constructor(scaleType?: XScaleType,
              color?: (d: any) => string,
              ticks?: number,
              ticksFormatter?: (d: any) => string,
              areaOpacity?: number) {
    super(color);
    this.ticks = ticks || 4;
    this.ticksFormatter = ticksFormatter;
    this.areaOpacity = areaOpacity || 0.2;
    this.scaleType = scaleType || XScaleType.linear;
  }
}

export abstract class WidgetBarGraphParameters extends WidgetGraphParameters {
  margin: number;

  constructor(color?: (d: any) => string, margin?: number) {
    super(color);
    this.margin = margin;
  }
}

enum XScaleType {
  date,
  linear
}

class LegendItem {
  name: string;
  color: string;
  currentValue: number;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
    this.currentValue = -1;
  }
}

export class Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;

  constructor(top: number, bottom: number, left: number, right: number) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }

  marginsX(): number {
    return this.left + this.right;
  }
}

export class GraphValues {
  name: string;
  labels: any[];
  values: number[];

  constructor(name: string, labels: any[], values: number[]) {
    this.name = name;
    this.labels = labels;
    this.values = values;
  }
}

export enum WidgetGraphType {
  multiline,
  line,
  bar,
  pie
}
