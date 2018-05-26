import { Component, OnInit, Input } from '@angular/core';
import { WidgetStatus } from '../models/widgetStatus';

@Component({
  selector: 'app-widget-image-status',
  templateUrl: './widget-image-status.component.html',
  styleUrls: ['./widget-image-status.component.css']
})
export class WidgetImageStatusComponent implements OnInit {

  @Input() widget: WidgetStatus;

  constructor() { }

  ngOnInit() {
  }

}
