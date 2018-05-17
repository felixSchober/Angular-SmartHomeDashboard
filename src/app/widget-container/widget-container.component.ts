import { Component, OnInit, Input } from '@angular/core';
import { Widget, WidgetType } from './../widget';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.css']
})
export class WidgetContainerComponent implements OnInit {
  @Input() widget: Widget;

  // enum widget type
  WidgetType: typeof WidgetType = WidgetType;


  constructor() {
  }

  ngOnInit() {
  }


}
