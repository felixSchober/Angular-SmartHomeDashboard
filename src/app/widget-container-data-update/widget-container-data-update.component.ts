import { Component, Input, OnInit } from '@angular/core';
import {IWidget} from '../interfaces/IWidget';
import { TopicDataService } from '../services/topic-data.service';


@Component({
  selector: 'app-widget-container-data-update',
  template: ``,
  styles: ['']
})
export class WidgetContainerDataUpdateComponent implements OnInit {

  @Input() widget: IWidget;
  constructor(private dataService: TopicDataService) { }

  ngOnInit() {
    console.log('[DATAUPDATE COMP] Subscribe to topic ' + this.widget.name + ' on behalf of widget');
    const subject$ = this.dataService.getData(this.widget.name)
      .subscribe(
        (data) => {
          this.widget.update(this.widget, data);
        }
      );
  }
}
