import { Component, OnInit, Input } from '@angular/core';
import {WidgetNumber} from '../models/widget';

function precisionRound(number, precision) : number {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

@Component({
  selector: 'app-widget-number',
  templateUrl: './widget-number.component.html',
  styleUrls: ['./widget-number.component.css']
})
export class WidgetNumberComponent implements OnInit {
  @Input() widget: WidgetNumber;

  constructor() { }

  ngOnInit() {
  }

  transformNumber(n: number, precision: number, toK?: boolean): string {
    if (toK) {
      return n > 1000 ? precisionRound(n / 1000, precision) + 'K' : precisionRound(n, precision) + '';
    }
    return precisionRound(n, precision) + '';
  }

}
