import { Component, OnInit, Input } from '@angular/core';
import {Widget} from '../widget';


@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  @Input() widget: Widget;

  constructor() { }

  ngOnInit() {
    console.log('Init Text Widget');
  }

}
