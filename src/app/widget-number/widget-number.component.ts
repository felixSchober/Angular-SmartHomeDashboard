import { Component, OnInit, Input } from '@angular/core';
import {WidgetNumber} from '../models/widget';
import { Utils } from '../utils';
import { TopicDataService } from '../services/topic-data.service';
import { TabNavigationService } from '../services/tab-navigation.service';

@Component({
  selector: 'app-widget-number',
  templateUrl: './widget-number.component.html',
  styleUrls: ['./widget-number.component.css']
})
export class WidgetNumberComponent implements OnInit {
  @Input() widget: WidgetNumber;

  constructor(public utils: Utils, private dataService: TopicDataService, private tabNavigation: TabNavigationService) { }

  ngOnInit() {
    // inject navigation service
    this.widget.setTabNavigationService(this.tabNavigation);
    this.widget.setTopicDataService(this.dataService);

    // subscribe to data observable
    const subject$ = this.dataService.getData(this.widget.name)
      .subscribe(
        (data) => {
          this.widget.update(this.widget, data);
        }
      );
  }

  test() {
    this.widget.onSelect(this.widget);
  }
}
