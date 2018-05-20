import {WidgetType, Widget} from './widget';
import {WidgetAction} from './widgetAction';
import * as d3 from 'd3';


export class WidgetGraph extends Widget {


  values: any;
  graphType: WidgetGraphType;
  d3GraphId: string;
  graphHeight: number;
  graphWidth: number;
  graphParameterDictionary: WidgetGraphParameters;

  constructor(name: string,
              title: string,
              graphType: WidgetGraphType,
              graphParameterDictionary: WidgetGraphParameters,
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
    this.graphHeight = this.cardHeight - 40;
    this.graphParameterDictionary = graphParameterDictionary;

    this.values = {
      'series1': [1, 2, 3, 2, 2, 1],
      'series2': [2, 2, 1.5, 2.2, 2]
    };
  }

  update(data: any) {
    this.updateLastUpdatedString();

  }

  private getSvgElement() {
    return d3
      .select('#' + this.d3GraphId)
      .append('svg')
      .attr('width', this.graphWidth)
      .attr('height', this.graphHeight);
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

  buildLineGraph() {
    const svg = this.getSvgElement();
    const g = svg.append('g');

    const v = [[1, 2, 3, 2, 2, 1]];

    /*svg.selectAll('p')
      .data(v)
      .enter()
      .append('text')
      .text('Fuck you');
      */

    //const xScale = this.getTimeScale();
    const yScale = d3.scaleLinear()
      .range([this.graphHeight, 0])
      .domain([0, 4]);
    //const zScale = d3.scaleOrdinal(d3.schemeCategory10);

    //const parseTime = d3.timeParse('%H:%M');

    const lineGenerator = d3.line()
      .curve(d3.curveBasis)
      .x((d, i) => {
        return i;
      })
      .y((d) => {
      return 1;
      //return yScale(d);
      });

    const lines = g.selectAll('.dataPoints')
      .data(v)
      .enter()
      .append('g')
      .attr('class', 'dataPoint');

    lines.append('path')
      .attr('class', 'line')
      .attr('d', (d) => {
        return lineGenerator(d);
      });
      //.style('stroke', (d, i) => { return zScale(i + ''); });
  }
}

export abstract class WidgetGraphParameters {
  constructor() {}
}

export abstract class WidgetBarGraphParameters extends WidgetGraphParameters{
  margin: number;

  constructor(margin: number) {
    super();
    this.margin = margin;
  }
}


export enum WidgetGraphType {
  line,
  bar,
  pie
}
