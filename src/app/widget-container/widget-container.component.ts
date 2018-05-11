import { Component, OnInit, Input } from '@angular/core';
import { Widget, WidgetType } from './../widget';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.css']
})
export class WidgetContainerComponent implements OnInit {
  @Input() widget: Widget;
  WidgetType: typeof WidgetType = WidgetType;
  widgetType: WidgetType;
  testType: number;
  constructor() {
    this.widgetType = WidgetType.Number;
    this.testType = 1;
  }

  ngOnInit() {
    console.log('Widget Type: ' + this.widget.type);
  }


}
