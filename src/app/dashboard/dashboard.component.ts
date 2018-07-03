import { Component, OnInit, Input } from '@angular/core';
import { WidgetConfigurationModel } from '../models/widget-configuration.model';
import { TabNavigationService } from '../services/tab-navigation.service';
import { ConfigurationLoader } from '../shared/configuration-loader';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() selectedTabIndex: number;
  public widgetTabs: WidgetConfigurationModel[];

  constructor(
    private navigationServer: TabNavigationService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.selectedTabIndex = 0;
    this.widgetTabs = [];

    this.navigationServer.addObserver({
      next: (newTabIndex: number) => {
        console.log('[TABS] jump to tab ' + newTabIndex);
        this.selectedTabIndex = newTabIndex;
      }
    });
  }

  ngOnInit() {

    const deviceIdFromRoute = this.route.snapshot.paramMap.get('deviceId');
    console.log('Initialize App with device id ' + deviceIdFromRoute);

    this.loadWidgets(deviceIdFromRoute);
  }

  private loadWidgets(deviceId: string) {
    this.widgetTabs = ConfigurationLoader.loadConfiguration(deviceId);
    console.log(`Loaded ${this.widgetTabs.length} pages`);
  }

}
