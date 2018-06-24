import { Component, Input } from '@angular/core';
import { TabNavigationService } from './services/tab-navigation.service';
import {WidgetConfigurationModel} from './models/widget-configuration.model';
import {WIDGETS} from './models/widgetConfiguration';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() selectedTabIndex: number;

  public widgetTabs: WidgetConfigurationModel[];

  constructor(private navigationServer: TabNavigationService) {
    this.selectedTabIndex = 0;
    this.widgetTabs = [];

    this.navigationServer.addObserver({
      next: (newTabIndex: number) => {
        console.log('[TABS] jump to tab ' + newTabIndex);
        this.selectedTabIndex = newTabIndex;
      }
    });

    this.loadWidgets();
  }

  private loadWidgets() {
    // TODO: for now hard code it
    const tabNames = ['Living', 'TV', 'Power', 'Kitchen', 'Lights', 'TESTING'];
    for (let i = 0; i < WIDGETS.length; i++) {
      const widgets = WIDGETS[i];
      const name = tabNames[i];

      const page = new WidgetConfigurationModel(name, '', i);
      page.widgets = widgets;
      console.log(`Add widget page ${name} with ${page.widgets.length} widgets`);
      this.widgetTabs.push(page);
    }
  }
}
