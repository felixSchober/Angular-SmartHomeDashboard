import { Component, Input, OnInit } from '@angular/core';
import { Widget } from '../models/widget';
import { TopicDataService } from '../services/topic-data.service';


@Component({
  selector: 'app-widget-container-data-update',
  template: ``,
  styles: ['']
})
export class WidgetContainerDataUpdateComponent implements OnInit {

  @Input() widget: Widget;
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
