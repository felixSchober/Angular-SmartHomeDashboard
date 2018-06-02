import { Component, OnInit, Input } from '@angular/core';
import {IWidget} from '../Interfaces/IWidget';


@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  @Input() widget: IWidget;

  constructor() { }

  ngOnInit() {
    console.log('Init Text Widget');
  }

}
