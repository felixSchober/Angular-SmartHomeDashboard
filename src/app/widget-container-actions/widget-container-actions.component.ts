import { Component, Input, OnInit } from '@angular/core';
import { Widget } from '../models/widget';
import { TabNavigationService } from '../services/tab-navigation.service';
import { TopicDataService } from '../services/topic-data.service';

@Component({
  selector: 'app-widget-container-actions',
  templateUrl: './widget-container-actions.component.html',
  styleUrls: ['./widget-container-actions.component.css']
})
export class WidgetContainerActionsComponent implements OnInit {

  @Input() widget: Widget;
  constructor(private dataService: TopicDataService, private tabNavigation: TabNavigationService) { }

  ngOnInit() {
    // inject navigation and data service into the widget
    this.widget.setTabNavigationService(this.tabNavigation);
    this.widget.setTopicDataService(this.dataService);
  }

}
