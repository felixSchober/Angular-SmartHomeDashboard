import { Component, OnInit, Input } from '@angular/core';
import {WidgetGraph} from '../models/widgetGraph';

@Component({
  selector: 'app-widget-graph',
  templateUrl: './widget-graph.component.html',
  styleUrls: ['./widget-graph.component.css']
})
export class WidgetGraphComponent implements OnInit {
  @Input() widget: WidgetGraph;

  constructor() {
  }

  ngOnInit() {
    if (!this.widget) {
      console.error('No widget set.');
      return;
    }

    this.widget.d3GraphId = 'd3Graph_' + this.widget.id;
    setTimeout(() => {
      this.widget.buildLineGraph();
    }, 800);
  }



}
