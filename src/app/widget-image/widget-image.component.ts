import { Component, OnInit, Input } from '@angular/core';
import {WidgetImage} from '../models/widgets/WidgetImage';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  @Input() widget: WidgetImage;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.widget) {
      this.widget.sanitizer = this.domSanitizer;
    }
  }

}
