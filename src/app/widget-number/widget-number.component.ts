import { Component, OnInit, Input } from '@angular/core';
import {Widget} from '../widget';


@Component({
  selector: 'app-widget-number',
  templateUrl: './widget-number.component.html',
  styleUrls: ['./widget-number.component.css']
})
export class WidgetNumberComponent implements OnInit {
  @Input() widget: Widget;

  constructor() { }

  ngOnInit() {
    console.log('Initialize number widget');
  }

}
