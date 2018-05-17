import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../models/widget';
import { WIDGETS } from '../models/widgetConfiguration';
@Component({
  selector: 'app-control-page',
  templateUrl: './control-page.component.html',
  styleUrls: ['./control-page.component.css']
})
export class ControlPageComponent implements OnInit {

  pageWidgets: Widget[];
  rows: number;
  cols: number;
  @Input() tabIndex: number;
  constructor() {
    this.cols = 4;

    // will be determined in OnInit
    this.rows = 3;
  }

  ngOnInit() {
    this.pageWidgets = WIDGETS[this.tabIndex];
    this.rows = Math.ceil(this.pageWidgets.length / this.cols);
  }

}
