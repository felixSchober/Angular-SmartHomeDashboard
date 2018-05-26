import { Component, OnInit, Input } from '@angular/core';
import { TopicDataService } from '../services/topic-data.service';
import { WidgetStatus } from '../models/widgetStatus';
import { TabNavigationService } from '../services/tab-navigation.service';


@Component({
  selector: 'app-widget-status',
  templateUrl: './widget-status.component.html',
  styleUrls: ['./widget-status.component.css']
})
export class WidgetStatusComponent implements OnInit {

  @Input() widget: WidgetStatus;

  constructor(private dataService: TopicDataService, private tabNavigation: TabNavigationService) { }

  ngOnInit() {
    // inject navigation service
    this.widget.setTabNavigationService(this.tabNavigation);
    this.widget.setTopicDataService(this.dataService);

    const subject$ = this.dataService.getData(this.widget.name)
      .subscribe(
        (data) => {
          this.widget.update(this.widget, data);
        }
      );
  }

}
