import { Component, OnInit, Input } from '@angular/core';
import { Widget } from './../widget';
import { WIDGETS } from './../WidgetConfiguration';
@Component({
  selector: 'app-control-page',
  templateUrl: './control-page.component.html',
  styleUrls: ['./control-page.component.css']
})
export class ControlPageComponent implements OnInit {

  pageWidgets: Widget[];
  @Input() tabIndex: number;
  constructor() {
  }

  ngOnInit() {
    this.pageWidgets = WIDGETS[this.tabIndex];
  }

}
