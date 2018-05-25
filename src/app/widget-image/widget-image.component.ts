import { Component, OnInit, Input } from '@angular/core';
import { WidgetImage } from '../models/widget';
import { TopicDataService } from '../services/topic-data.service';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  @Input() widget: WidgetImage;
  constructor(private dataService: TopicDataService) { }

  ngOnInit() {
    const subject$ = this.dataService.getData(this.widget.name)
      .subscribe(
        (data) => {
          this.widget.update(this.widget, data);
        }
      );
  }

}
