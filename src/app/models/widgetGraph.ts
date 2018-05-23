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
  colorScale: (d: any) => string;
  showLegend: boolean;
  legendItems: LegendItem[];

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

    if (!this.graphParameterDictionary) {
      // create default parameters
      if (this.graphType === WidgetGraphType.line) {
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

    this.redefineColorScale();
    this.updateLegendItems(this.values);
  }

  update(data: any) {
    this.updateLastUpdatedString();

    this.redefineColorScale();
    this.updateLegendItems(data);
  }

  // should be called if the series change
  redefineColorScale() {
    // use parameters color function if defined. If not then the d3 colors are used.
    if (this.graphParameterDictionary.color) {
      this.colorScale = this.graphParameterDictionary.color;
    } else {
      this.colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(this.values.map((e) => {
          return e.name;
        }));
    }
  }

  updateLegendItems(data: any) {
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
    this.update(this.values);

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

    const zScale = this.colorScale;

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
    g.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
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

  constructor(color?: (d: any) => string, ticks?: number, ticksFormatter?: (d: any) => string, areaOpacity?: number) {
    super(color);
    this.ticks = ticks || 4;
    this.ticksFormatter = ticksFormatter;
    this.areaOpacity = areaOpacity || 0.2;
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

export enum WidgetGraphType {
  multiline,
  line,
  bar,
  pie
}
