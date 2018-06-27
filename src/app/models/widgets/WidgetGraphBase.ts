import * as d3 from 'd3';
import {GraphXScaleType} from '../../enums/GraphXScaleType';
import {WidgetType} from '../../enums/WidgetType';
import {IGraphLegendItem} from '../../interfaces/IGraphLegendItem';
import {IGraphMargins} from '../../interfaces/IGraphMargins';
import {IGraphParameters} from '../../interfaces/IGraphParameters';
import {IGraphValues} from '../../interfaces/IGraphValues';
import {IWidget} from '../../interfaces/IWidget';
import {IWidgetGraph} from '../../interfaces/IWidgetGraph';
import {Utils} from '../../utils';
import {GraphLegendItem} from '../Graph/GraphLegendItem';
import {GraphMargins} from '../Graph/GraphMargins';
import {WidgetAction} from '../widgetAction';
import {WidgetBase} from './WidgetBase';

// noinspection TsLint
const dateRegularExpression = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;

export abstract class WidgetGraphBase extends WidgetBase implements IWidgetGraph {
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

  //noinspection JSAnnotator
  svgElement: d3.Selection<any, any, any, any>;
  xAxis: any;
  yAxis: any;
  graphWasBuild: boolean;

  protected static tryConvertStringArrayToDateArray(labels: string[]) {

    // check first label to see if it is a date
    const firstLabel = labels[0];
    const parts = firstLabel.match(dateRegularExpression);

    // conversion won't be possible
    if (parts === null) {
      return labels;
    }

    const dateArray: Date[] = [];
    for (const l of labels) {
      dateArray.push(new Date(l));
    }
    return dateArray;
  }

  protected constructor(
                        name: string,
                        title: string,
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
    super(name, title, WidgetType.Graph, subtitle, dataPrefix,
      dataSuffix, sizeX, sizeY, cardColor, cardHeaderColor, actions);
    this.graphWidth = this.cardWidth;
    this.graphHeight = this.cardHeight - 24;
    this.graphMargins = margins || new GraphMargins(4, 20, 28, 4);
    this.showLegend = showLegend || true;
    this.legendItems = [];
    this.graphWasBuild = false;

    this.values = [];
  }

  update(widget: IWidget, data: any) {
    const widgetGraph = widget as WidgetGraphBase;
    const graphData = data as IGraphValues[];

    // we might need to parse the labels as dates. This is not done before
    for (const series of graphData) {
      series.labels = WidgetGraphBase.tryConvertStringArrayToDateArray(series.labels);
    }

    // auto detect x-scale type if not set by user
    if (graphData[0].labels[0] instanceof Date && widgetGraph.graphParameterDictionary.scaleType !== GraphXScaleType.date) {
      console.log('Autodetect xscale type of type date');
      widgetGraph.graphParameterDictionary.scaleType = GraphXScaleType.date;
    }

    // update values
    widgetGraph.values = graphData;

    widgetGraph.updateLastUpdatedString();
    widgetGraph.redefineScales();
    widgetGraph.updateLegendItems(graphData);

    // create svg element if not already created but only if there is already some data
    if (!widgetGraph.svgElement) {
      const svg = widgetGraph.appendSvgElement();

      // if the widget is not display the svg element is null
      if (!svg) {
        console.log('Could not get graph element.');
        return;
      }
      widgetGraph.svgElement = svg;
      widgetGraph.buildGraph();
      return;
    }

    // update data
    widgetGraph.applyDataChange();
  }


  // should be called if the series change
  protected redefineScales() {

    // UPDATE COLOR SCALE
    this.redefineColorScale();

    // UPDATE Y-axis
    this.calculateYScaleDomain(this.graphHeight);

    // UPDATE X-axis
    this.calculateXScaleDomain(this.graphWidth);
  }

  protected redefineColorScale() {
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
  }

  protected calculateYScaleDomain(h: number) {
    if (!this.yScale) {
      const yRange: ReadonlyArray<number> = <ReadonlyArray<number>>[h, 0];
      this.yScale = d3.scaleLinear()
        .range(yRange);
    }

    // if no values are available yet, don't calculate domain
    if (!this.values) {
      return;
    }

    // get the maximum of the data values
    const maxSeriesValue = d3.max(this.values, (seriesData) => {
      // return max of the series
      return d3.max(seriesData.values, (d: any) =>  d );
    });
    this.yScale.domain([0, maxSeriesValue]);
  }

  protected abstract calculateXScaleDomain(w: number);

  protected createGraphAxis() {
    this.createGraphXAxis(this.graphParameterDictionary);
    this.createGraphYAxis(this.graphParameterDictionary);
  }

  protected createGraphYAxis(parameters: IGraphParameters) {
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

  protected abstract createGraphXAxis(parameters: IGraphParameters);

  protected dataKeyFunction(d: any) {
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

  protected updateLegendItems(data: IGraphValues[]) {
    // no elements so far
    if (!this.legendItems || this.legendItems.length !== data.length)  {
      this.legendItems = [];
      for (let i = 0; i < data.length; i++) {
        const series = data[i];
        const seriesColor = this.colorScale(series.name);
        const li = new GraphLegendItem(series.name, seriesColor);
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
          this.legendItems[i] = new GraphLegendItem(dataSeries.name, seriesColor);
          this.legendItems[i].currentValue = dataSeries.values[dataSeries.values.length - 1];
        }
      }
    }
  }

  //noinspection JSAnnotator
  protected appendSvgElement(): d3.Selection<any, any, any, any> {
    // update card width based on d3 parent container element
    //noinspection TypeScriptUnresolvedFunction
    const graphElement: any = d3.select('#' + this.d3GraphId).node();
    if (!graphElement) {
      return null;
    }
    this.graphWidth = graphElement.getBoundingClientRect().width - this.graphMargins.marginsX();

    return d3
      .select('#' + this.d3GraphId)
      .append('svg')
      .attr('id', 'svg-' + this.d3GraphId)
      .attr('width', this.graphWidth + this.graphMargins.left + this.graphMargins.right)
      .attr('height', this.graphHeight + this.graphMargins.top + this.graphMargins.bottom);
  }

  protected abstract buildGraph();

  protected abstract applyDataChange();
}
