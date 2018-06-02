import {ActionButtonType} from '../enums/ActionButtonType';
import {IDataServiceInjectable} from './IDataServiceInjectable';
import {INavigationServiceInjectable} from './INavigationServiceInjectable';
import {WidgetType} from '../enums/WidgetType';
import {WidgetAction} from '../models/widgetAction';
import {TabNavigationService} from '../services/tab-navigation.service';
import {TopicDataService} from '../services/topic-data.service';

export interface IWidget extends INavigationServiceInjectable, IDataServiceInjectable {
  id: number;
  name: string;
  type: WidgetType;
  title: string;
  subtitle: string;
  updatedAt: Date;
  updatedAtString: string;
  sizeX: number;
  sizeY: number;
  dataPrefix: string;
  dataSuffix: string;
  cardColor: string;
  cardHeaderColor: string;
  cardWidth: number;
  cardHeight: number;
  actions: WidgetAction[];
  primaryAction: WidgetAction;
  secondaryActions: WidgetAction[];
  tabNavigationService: TabNavigationService;
  dataService: TopicDataService;
  ActionButtonType: typeof ActionButtonType;

  updateLastUpdatedString();

  update(widget: IWidget, data: any): void;

  onSelect(sender: IWidget): void;
}
