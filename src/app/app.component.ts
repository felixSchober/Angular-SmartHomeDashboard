import { Component, Input } from '@angular/core';
import { TabNavigationService } from './services/tab-navigation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() selectedTabIndex: number;

  constructor(private navigationServer: TabNavigationService) {
    this.selectedTabIndex = 0;
    this.navigationServer.addObserver({
      next: (newTabIndex: number) => {
        console.log('[TABS] jump to tab ' + newTabIndex);
        this.selectedTabIndex = newTabIndex;
      }
    });
  }
}
