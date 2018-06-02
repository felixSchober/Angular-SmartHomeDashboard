import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../Interfaces/IWidget';
import {TabNavigationService} from '../../services/tab-navigation.service';
import {TopicDataService} from '../../services/topic-data.service';
import {WidgetAction} from '../widgetAction';
import { ActionButtonType } from '../../enums/ActionButtonType';
import * as moment from 'moment';

const standardCardWidth = 115; // 185
const standardCardHeight = 115;
const cardMargin = 48; // margin 24 on both sides -> 48
const cardGridPadding = 16; // 8 on both sides

let currentWidgetId = 0;


export abstract class WidgetBase implements IWidget {
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
  ActionButtonType: typeof ActionButtonType = ActionButtonType;

  protected constructor(name: string,
              title: string,
              widgetType: WidgetType,
              subtitle?: string,
              dataPrefix?: string,
              dataSuffix?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string,
              cardHeaderColor?: string,
              actions?: WidgetAction[]) {
    this.id = currentWidgetId;
    currentWidgetId++;

    this.name = name;
    this.title = title;
    this.subtitle = subtitle || '';

    // TODO: Change to not defined.
    this.updatedAt = moment().toDate();
    this.type = widgetType;
    this.sizeX = sizeX || 1;
    this.sizeY = sizeY || 1;

    this.cardWidth = this.sizeX * standardCardWidth + cardMargin * (this.sizeX - 1) + cardGridPadding * (this.sizeX - 1);
    this.cardHeight = this.sizeY * standardCardHeight + cardMargin * (this.sizeY - 1) + cardGridPadding * (this.sizeY - 1);
    this.dataPrefix = dataPrefix || '';
    this.dataSuffix = dataSuffix || '';
    this.cardHeaderColor = cardHeaderColor || '#4CAF50';
    this.cardColor = cardColor || '#FFF';

    this.actions = actions || [];
    // search for primary action (click on card to execute)
    this.primaryAction = this.actions.filter((action) => action.type === ActionButtonType.Primary)[0];
    this.secondaryActions = this.actions.filter((action) => action.type !== ActionButtonType.Primary);

    console.log('Widget ' + this.name + ' (' + this.type + ') created with ' + this.cardWidth + 'x' + this.cardHeight);
  }

  private getLastUpdatedString(): string {
    return moment(this.updatedAt).calendar();
  }

  updateLastUpdatedString() {
    this.updatedAt = new Date();
    this.updatedAtString = this.getLastUpdatedString();
  }

  // inject navigation service into widget
  setTabNavigationService(tabNavigationService: TabNavigationService) {
    this.tabNavigationService = tabNavigationService;

    for (const action of this.actions) {
      action.setTabNavigationService(this.tabNavigationService);
    }
  }

  setTopicDataService(dataService: TopicDataService) {
    this.dataService = dataService;

    for (const action of this.actions) {
      action.setTopicDataService(this.dataService);
    }
  }

  abstract update(widget: WidgetBase, data: any): void;

  onSelect(sender: WidgetBase): void {
    if (sender.primaryAction) {
      sender.primaryAction.execute(sender, null);
    }
  }

  toString(): string {
    return this.name + ' (id ' + this.id + '): ' + this.subtitle;
  }
}
