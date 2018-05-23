import {WidgetType, Widget} from './widget';
import {WidgetAction} from './widgetAction';
import { Utils } from '../utils';
import * as d3 from 'd3';



export class WidgetGraph extends Widget {
  values: any;
  graphType: WidgetGraphType;
  d3GraphId: string;
  graphHeight: number;
  graphWidth: number;
  graphMargins: Margins;
  graphParameterDictionary: WidgetGraphParameters;

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
              actions?: WidgetAction[]) {
    super(name, title, WidgetType.Graph, subtitle, dataPrefix, dataSuffix, sizeX, sizeY, cardColor, cardHeaderColor, actions);
    this.graphType = graphType;
    this.graphWidth = this.cardWidth;
    this.graphHeight = this.cardHeight - 24;
    this.graphParameterDictionary = graphParameterDictionary;
    this.graphMargins = margins || new Margins(4, 20, 28, 4);

    if (!this.graphParameterDictionary) {
      // create default parameters
      if (this.graphType === WidgetGraphType.line){
        this.graphParameterDictionary = new WidgetLineGraphParameters();
      }
    }

    this.values = [{
      name: 'series1',
      labels: ['1', '2', '3', '4'],
      values: [900, 980, 999, 891]
    }, {
      name: 'series2',
      labels: ['1', '2', '3', '4'],
      values: [699, 811, 913, 139]
    }];
  }

  update(data: any) {
    this.updateLastUpdatedString();

  }

  private getSvgElement() {
    // update card width based on d3 parent container element
    this.graphWidth = d3.select('#' + this.d3GraphId).node().getBoundingClientRect().width - this.graphMargins.marginsX();

    return d3
      .select('#' + this.d3GraphId)
      .append('svg')
      .attr('width', this.graphWidth + this.graphMargins.left + this.graphMargins.right)
      .attr('height', this.graphHeight + this.graphMargins.top + this.graphMargins.bottom);
  }

  private getTimeScale() {
    /*
    const scale = d3.scaleTime()
      .range(0, this.graphWidth);
      //.domain(d3.extent(data))
    return scale;*/
  }

  buildPointGraph() {
    const svg = this.getSvgElement();
    const circles = svg.selectAll('circle')
      .data(this.values)
      .enter()
      .append('circle');

    //circles.attr('')
  }

  buildBarGraph() {
    const svg = this.getSvgElement();
    const bars = svg.selectAll('rect')
      .data(this.values)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return i * 21;
      })
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 100);
  }

  buildMultiLineGraph() {
    const svg = this.getSvgElement();
    const g = svg.append('g')
      .attr('transform', 'translate(' + this.graphMargins.left + ',' + this.graphMargins.top + ')');
    const w = this.graphWidth;
    const h = this.graphHeight;

    const v = this.values;
    const parameters = this.graphParameterDictionary as WidgetLineGraphParameters;
    const curveFactory = d3.curveBasis;

    let xScale;
    let scaleType;
    if (typeof v[0].labels[0] === 'string') {
      xScale = d3.scaleLinear()
        .range([0, w])
        .domain([0, v[0].labels.length - 1]);
      scaleType = xScaleType.linear;
    } else if (v[0].labels[0] instanceof Date) {
      xScale = d3.scaleTime()
        .range([0, w])
        .domain(v[0].labels[0], v[0].labels[v[0].labels.length - 1]);
      scaleType = xScaleType.date;
    } else {
      console.error('unknown label type.');
      throw new TypeError('unknown label type ' + typeof v[0].labels[0]);
    }

    //const parseTime = d3.timeParse('%H:%M');


    const yScale = d3.scaleLinear()
      .range([h, 0]);

    // get the maximum of the data values
    yScale.domain([
      0,
      d3.max(v, (seriesData) => {
      // return max of the series
      return d3.max(seriesData.values, (d) =>  d );
    })
    ]);

    // use parameters color function if defined. If not then the d3 colors are used.
    let zScale;
    if (parameters.color) {
      zScale = parameters.color;
    } else {
      zScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(v.map((e) => {
          return e.name;
        }));
    }

    const xAxis = d3.axisBottom().scale(xScale).ticks(parameters.ticks);
    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(4)
      .tickFormat((d) => {
        if (parameters.ticksFormatter) {
          return parameters.ticksFormatter(d);
        }
        return this.dataPrefix + Utils.toK(d) + this.dataSuffix;
      });

    const dataKeyFunction = function (d) {
      const result = {
        name: d.name
      };

      // zip values of labels and values together
      result.data = d.values.map((e, i) => {
        return {value: e, label: d.labels[i]};
      });
      return result;
    };

    const lineGenerator = d3.line()
      .curve(curveFactory)
      .x((d, i) => {
        if (scaleType === xScaleType.linear) {
          return xScale(i);
        }
        return xScale(d.label);
      })
      .y((d) => {
        return yScale(d.value);
      });

    const areaGenerator = d3.area()
      .curve(curveFactory)
      .x((d, i) => {
        if (scaleType === xScaleType.linear) {
          return xScale(i);
        }
        return xScale(d.label);
      })
      .y0(h)
      .y1((d) => {
        return yScale(d.value);
      });

    const areas = g.selectAll('.areas')
      .data(this.values)
      .enter()
      .append('path')
      .attr('class', 'area')
      .style('opacity', parameters.areaOpacity)
      .style('fill', (d) => {
        return zScale(d.name);
      })
      .attr('d', (d) => {
        const data = dataKeyFunction(d).data;
        return areaGenerator(data);
      });

    const lines = g.selectAll('.dataPoints')
      .data(this.values)
      .enter()
      .append('g')
      .attr('class', 'dataPoint');

    lines.append('path')
      .attr('class', 'graph-line')
      .attr('fill', 'none')
      .attr('d', (d) => {
        const data = dataKeyFunction(d).data;
        return lineGenerator(data);
      })
      .style('stroke', (d) => {
        return zScale(d.name);
      });

    // add x axis
    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + h + ')')
      .call(xAxis);

    // add y axis
    /*g.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Cases');*/
  }


}

export abstract class WidgetGraphParameters {
  constructor() {}
}

export class WidgetLineGraphParameters extends WidgetGraphParameters {
  ticks: number;
  ticksFormatter: (d: any) => string;
  areaOpacity: number;
  color: (d: any) => string;

  constructor(color?: (d: any) => string, ticks?: number, ticksFormatter?: (d: any) => string, areaOpacity?: number) {
    this.ticks = ticks || 4;
    this.ticksFormatter = ticksFormatter;
    this.areaOpacity = areaOpacity || 0.2;
    this.color = color;
  }
}

export abstract class WidgetBarGraphParameters extends WidgetGraphParameters {
  margin: number;

  constructor(margin: number) {
    super();
    this.margin = margin;
  }
}

enum xScaleType {
  date,
  linear
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

export enum WidgetGraphType {
  multiline,
  line,
  bar,
  pie
}
