import { Component, OnInit, Input } from '@angular/core';
import {WidgetImage} from '../models/widget';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  @Input() widget: WidgetImage;
  constructor() { }

  ngOnInit() {
  }

}
