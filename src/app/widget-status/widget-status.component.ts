import { Component, OnInit, Input } from '@angular/core';
import { TopicDataService } from '../services/topic-data.service';
import {WidgetStatus} from '../models/widgetStatus';


@Component({
  selector: 'app-widget-status',
  templateUrl: './widget-status.component.html',
  styleUrls: ['./widget-status.component.css']
})
export class WidgetStatusComponent implements OnInit {

  @Input() widget: WidgetStatus;

  constructor(private dataService: TopicDataService) { }

  ngOnInit() {
    const subject$ = this.dataService.getData(this.widget.name)
      .subscribe(
        (data) => {
          this.widget.update(this.widget, data);
        }
      );
  }

}
