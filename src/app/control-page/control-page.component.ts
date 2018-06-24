import { Component, OnInit, Input } from '@angular/core';
import {IWidget} from '../interfaces/IWidget';
@Component({
  selector: 'app-control-page',
  templateUrl: './control-page.component.html',
  styleUrls: ['./control-page.component.css']
})
export class ControlPageComponent implements OnInit {

  @Input() pageWidgets: IWidget[];

  constructor() {
  }

  ngOnInit() {
  }
}
