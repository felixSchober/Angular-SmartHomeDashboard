import { Component, OnInit, Input } from '@angular/core';
import {WidgetNumber} from '../models/widget';
import { Utils } from '../utils';
import { SmartHomeService } from '../services/smart-home.service';


@Component({
  selector: 'app-widget-number',
  templateUrl: './widget-number.component.html',
  styleUrls: ['./widget-number.component.css']
})
export class WidgetNumberComponent implements OnInit {
  @Input() widget: WidgetNumber;

  constructor(public utils: Utils, private shService: SmartHomeService) { }

  ngOnInit() {
    this.shService.messages.subscribe(msg => {
      console.log('GOT MESSAGE: ' + msg);
    });
    this.shService.sendMsg('Test');
  }
}
