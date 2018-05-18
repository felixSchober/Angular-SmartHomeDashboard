import { Component, OnInit, Input } from '@angular/core';
import { WidgetClock } from '../models/widget';
import * as moment from 'moment';

@Component({
  selector: 'app-widget-clock',
  templateUrl: './widget-clock.component.html',
  styleUrls: ['./widget-clock.component.css']
})
export class WidgetClockComponent implements OnInit {

  @Input() widget: WidgetClock;
  constructor() { }

  ngOnInit() {
    // update clock every second
    setInterval(() => {
      this.widget.updateCurrentTime();
    }, 1000);
  }

}
