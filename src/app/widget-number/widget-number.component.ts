import { Component, OnInit, Input } from '@angular/core';
import {WidgetNumber} from '../models/widget';
import { Utils } from '../utils';
import { TopicDataService } from '../services/topic-data.service';

@Component({
  selector: 'app-widget-number',
  templateUrl: './widget-number.component.html',
  styleUrls: ['./widget-number.component.css']
})
export class WidgetNumberComponent implements OnInit {
  @Input() widget: WidgetNumber;

  constructor(public utils: Utils, private dataService: TopicDataService) { }

  ngOnInit() {
    const subject$ = this.dataService.getData(this.widget.name)
      .subscribe(
        (data) => {
          this.widget.update(this.widget, data);
        }
      );
  }
}
