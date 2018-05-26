import { Component, OnInit, Input } from '@angular/core';
import { WidgetClock } from '../models/widget';
import * as moment from 'moment';
import { TabNavigationService } from '../services/tab-navigation.service';
import { TopicDataService } from '../services/topic-data.service';


@Component({
  selector: 'app-widget-clock',
  templateUrl: './widget-clock.component.html',
  styleUrls: ['./widget-clock.component.css']
})
export class WidgetClockComponent implements OnInit {

  @Input() widget: WidgetClock;
  constructor(private tabNavigation: TabNavigationService, private dataService: TopicDataService) { }

  ngOnInit() {
    // inject navigation service
    this.widget.setTabNavigationService(this.tabNavigation);
    this.widget.setTopicDataService(this.dataService);

    // update clock every second
    setInterval(() => {
      this.widget.updateCurrentTime();
    }, 1000);
  }

}
