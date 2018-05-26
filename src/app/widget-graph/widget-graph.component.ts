import { Component, OnInit, Input } from '@angular/core';
import {WidgetGraph} from '../models/widgetGraph';
import { Utils } from '../utils';
import { TabNavigationService } from '../services/tab-navigation.service';
import { TopicDataService } from '../services/topic-data.service';


@Component({
  selector: 'app-widget-graph',
  templateUrl: './widget-graph.component.html',
  styleUrls: ['./widget-graph.component.css']
})
export class WidgetGraphComponent implements OnInit {
  @Input() widget: WidgetGraph;

  constructor(public utils: Utils, private tabNavigation: TabNavigationService,
              private dataService: TopicDataService) { }

  ngOnInit() {
    if (!this.widget) {
      console.error('No widget set.');
      return;
    }
    // inject navigation service
    this.widget.setTabNavigationService(this.tabNavigation);
    this.widget.setTopicDataService(this.dataService);

    this.widget.d3GraphId = 'd3Graph_' + this.widget.id;
  }



}
