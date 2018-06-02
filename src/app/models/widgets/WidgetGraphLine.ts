import * as d3 from 'd3';
import {GraphXScaleType} from '../../enums/GraphXScaleType';
import {IGraphMargins} from '../../Interfaces/IGraphMargins';
import {IGraphParameters} from '../../Interfaces/IGraphParameters';
import {GraphParametersLine} from '../Graph/GraphParametersLine';
import {WidgetAction} from '../widgetAction';
import {WidgetGraphBase} from './WidgetGraphBase';
import * as moment from 'moment';

export class WidgetGraphLine extends WidgetGraphBase {
  curveFactory: any;

  constructor(
    name: string,
    title: string,
    graphParameterDictionary: IGraphParameters,
    margins?: IGraphMargins,
    subtitle?: string,
    dataPrefix?: string,
    dataSuffix?: string,
    sizeX?: number,
    sizeY?: number,
    cardColor?: string,
    cardHeaderColor?: string,
    showLegend?: boolean,
    actions?: WidgetAction[]) {
    super(name, title, margins, subtitle,
      dataPrefix, dataSuffix, sizeX, sizeY, cardColor, cardHeaderColor, showLegend, actions);
    this.curveFactory = d3.curveBasis;

    if (!graphParameterDictionary) {
      // create default parameters
      this.graphParameterDictionary = new GraphParametersLine();
    } else {
      this.graphParameterDictionary = graphParameterDictionary;
    }
  }

  private lineGenerator() {
    const parameters = this.graphParameterDictionary as GraphParametersLine;
    return d3.line()
      .curve(this.curveFactory)
      .x((d: any, i) => {
        if (parameters.scaleType === GraphXScaleType.linear) {
          return this.xScale(i);
        }
        return this.xScale(d.label);
      })
      .y((d: any) => {
        return this.yScale(d.value);
      });
  }

  private areaGenerator() {
    const parameters = this.graphParameterDictionary as GraphParametersLine;

    return d3.area()
      .curve(this.curveFactory)
      .x((d: any, i) => {
        if (parameters.scaleType === GraphXScaleType.linear) {
          return this.xScale(i);
        }
        return this.xScale(d.label);
      })
      .y0(this.graphHeight)
      .y1((d: any) => {
        return this.yScale(d.value);
      });
  }

  protected applyDataChange() {
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

  protected calculateXScaleDomain(w: number) {
    // if no values are available yet, don't calculate domain
    if (!this.values) {
      return;
    }

    const v = this.values;
    const rangeTuple: ReadonlyArray<number> = <ReadonlyArray<number>>[0, w];

    if (typeof v[0].labels[0] === 'string') {
      this.xScale = d3.scaleLinear()
        .range(rangeTuple)
        .domain([0, v[0].labels.length - 1]);
    } else if (v[0].labels[0] instanceof Date) {
      const from = v[0].labels[0];
      const till = v[0].labels[v[0].labels.length - 1];
      this.xScale = d3.scaleTime()
        .range(rangeTuple)
        .domain([from, till]);
    } else {
      console.error('unknown label type.');
      throw new TypeError('unknown label type ' + typeof v[0].labels[0]);
    }
  }

  protected createGraphXAxis(parameters: IGraphParameters) {
    if (!this.xAxis) {
      if (parameters.scaleType === GraphXScaleType.linear) {
        this.xAxis = d3.axisBottom(this.xScale)
          .ticks(parameters.ticks);
      } else if (parameters.scaleType === GraphXScaleType.date) {
        this.xAxis = d3.axisBottom(this.xScale)
          .ticks(parameters.ticks)
          .tickFormat((d: any) => {
            return moment(d).format(parameters.dateFormatString);
          });
      }
    }
  }

  protected buildGraph() {
    if (!this.svgElement) {
      this.svgElement = this.appendSvgElement();
    }
    const svg = this.svgElement;
    const g = svg.append('g')
      .attr('transform', 'translate(' + this.graphMargins.left + ',' + this.graphMargins.top + ')');
    const w = this.graphWidth;
    const h = this.graphHeight;
    const parameters = this.graphParameterDictionary as GraphParametersLine;

    const lineGenerator = this.lineGenerator();
    const areaGenerator = this.areaGenerator();

    // calculate scales
    this.calculateXScaleDomain(w);
    this.calculateYScaleDomain(h);
    const zScale = this.colorScale;

    // get axis
    this.createGraphAxis();

    g.selectAll('.areas')
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
