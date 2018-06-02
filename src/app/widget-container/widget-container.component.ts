import { Component, OnInit, Input } from '@angular/core';
import {WidgetType} from '../enums/WidgetType';
import {IWidget} from '../Interfaces/IWidget';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.css']
})
export class WidgetContainerComponent implements OnInit {
  @Input() widget: IWidget;

  // enum widget type
  WidgetType: typeof WidgetType = WidgetType;


  constructor() {
  }

  ngOnInit() {
  }


}
