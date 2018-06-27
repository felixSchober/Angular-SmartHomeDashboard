import { Component, Input } from '@angular/core';
import { TabNavigationService } from './services/tab-navigation.service';
import {WidgetConfigurationModel} from './models/widget-configuration.model';
import {WIDGETS} from './models/widgetConfiguration';
import { ConfigurationLoader } from './shared/configuration-loader';


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

    this.widgetTabs = ConfigurationLoader.loadConfiguration();
    console.log(`Loaded ${this.widgetTabs.length} pages`);
  }
}
