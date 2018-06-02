import { Component, OnInit, Input } from '@angular/core';
import {WidgetNumber} from '../models/widgets/WidgetNumber';
import { Utils } from '../utils';

@Component({
  selector: 'app-widget-number',
  templateUrl: './widget-number.component.html',
  styleUrls: ['./widget-number.component.css']
})
export class WidgetNumberComponent implements OnInit {
  @Input() widget: WidgetNumber;

  constructor(public utils: Utils) { }

  ngOnInit() {
  }
}
