import { Component, OnInit, Input } from '@angular/core';
import {WidgetGraphBase} from '../models/widgets/WidgetGraphBase';
import { Utils } from '../utils';


@Component({
  selector: 'app-widget-graph',
  templateUrl: './widget-graph.component.html',
  styleUrls: ['./widget-graph.component.css']
})
export class WidgetGraphComponent implements OnInit {
  @Input() widget: WidgetGraphBase;

  constructor(public utils: Utils) { }

  ngOnInit() {
    this.widget.d3GraphId = 'd3Graph_' + this.widget.id;
  }



}
