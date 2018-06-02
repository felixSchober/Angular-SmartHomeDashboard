import { Component, OnInit, Input } from '@angular/core';
import {WidgetStatus} from '../models/widgets/WidgetStatus';


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
