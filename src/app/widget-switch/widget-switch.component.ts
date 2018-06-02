import {Component, Input, OnInit} from '@angular/core';
import {WidgetSwitch} from '../models/widgets/WidgetSwitch';

@Component({
  selector: 'app-widget-switch',
  templateUrl: './widget-switch.component.html',
  styleUrls: ['./widget-switch.component.css']
})
export class WidgetSwitchComponent implements OnInit {

  @Input() widget: WidgetSwitch;

  constructor() { }

  ngOnInit() {
  }

}
