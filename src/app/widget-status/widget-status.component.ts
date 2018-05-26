import { Component, OnInit, Input } from '@angular/core';
import { WidgetStatus } from '../models/widgetStatus';


@Component({
  selector: 'app-widget-status',
  templateUrl: './widget-status.component.html',
  styleUrls: ['./widget-status.component.css']
})
export class WidgetStatusComponent implements OnInit {

  @Input() widget: WidgetStatus;

  constructor() { }

  ngOnInit() {
  }

}
