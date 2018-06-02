import {TabNavigationService} from '../services/tab-navigation.service';

export interface INavigationServiceInjectable {
  setTabNavigationService(tabNavigationService: TabNavigationService): void;
}
