import { Component, OnInit, Input } from '@angular/core';
import {WidgetGraph} from '../models/widgetGraph';
import { Utils } from '../utils';


@Component({
  selector: 'app-widget-graph',
  templateUrl: './widget-graph.component.html',
  styleUrls: ['./widget-graph.component.css']
})
export class WidgetGraphComponent implements OnInit {
  @Input() widget: WidgetGraph;

  constructor(public utils: Utils) { }

  ngOnInit() {
    if (!this.widget) {
      console.error('No widget set.');
      return;
    }

    this.widget.d3GraphId = 'd3Graph_' + this.widget.id;
    setTimeout(() => {
      this.widget.buildMultiLineGraph();
    }, 800);
  }



}