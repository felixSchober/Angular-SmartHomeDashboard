import { Component, OnInit, Input } from '@angular/core';
import { WidgetCurrentTrack } from '../models/widgets/WidgetCurrentTrack';

@Component({
  selector: 'app-widget-player-current-track',
  templateUrl: './widget-player-current-track.component.html',
  styleUrls: ['./widget-player-current-track.component.css']
})
export class WidgetPlayerCurrentTrackComponent implements OnInit {
  @Input() widget: WidgetCurrentTrack;

  constructor() { }

  ngOnInit() {
  }

}
