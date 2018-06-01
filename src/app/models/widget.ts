import * as moment from 'moment';
import {ActionButtonType, WidgetAction} from './widgetAction';
import {TabNavigationService} from '../services/tab-navigation.service';
import {TopicDataService} from '../services/topic-data.service';

let currentWidgetId = 0;
const standardCardWidth = 115; // 185
const standardCardHeight = 115;
const cardMargin = 48; // margin 24 on both sides -> 48
const cardGridPadding = 16; // 8 on both sides


export abstract class Widget {
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

    constructor(name: string,
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

  abstract update(widget: Widget, data: any): void;

  onSelect(sender: Widget): void {
    if (sender.primaryAction) {
      sender.primaryAction.execute(sender, null);
    }
  }

  toString(): string {
    return this.name + ' (id ' + this.id + '): ' + this.subtitle;
  }
}

export class WidgetText extends Widget {

  currentTextContent: string;

  constructor(name: string,
              title: string,
              subtitle?: string,
              dataPrefix?: string,
              dataSuffix?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string) {
    super(name, title, WidgetType.Text, subtitle, dataPrefix, dataSuffix, sizeX, sizeY, cardColor);
    this.currentTextContent = '';
  }

  update(widget: Widget, data: any) {

  }
}

export class WidgetNumber extends Widget {


  currentNumber: number;
  showHighLow: boolean;
  highValue: number;
  lowValue: number;

  constructor(name: string,
              title: string,
              subtitle?: string,
              dataPrefix?: string,
              dataSuffix?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string,
              cardHeaderColor?: string,
              actions?: WidgetAction[],
              showHighLow?: boolean) {
    super(name, title, WidgetType.Number, subtitle, dataPrefix, dataSuffix, sizeX, sizeY, cardColor, cardHeaderColor, actions);
    this.currentNumber = Math.random() * 3000;
    this.showHighLow = showHighLow || false;
    if (this.showHighLow) {
      this.highValue = this.currentNumber + 10;
      this.lowValue = this.currentNumber - 10;
    }
  }

  update(widget: Widget, data: any) {
    const widgetNumber = widget as WidgetNumber;
    widgetNumber.updateLastUpdatedString();

    if (typeof data === 'number') {
      const newNumber = data as number;
      console.log('[w-' + widgetNumber.name + '] new data (' + newNumber + ')');
      widgetNumber.lowValue = Math.min(widgetNumber.lowValue, newNumber);
      widgetNumber.highValue = Math.max(widgetNumber.highValue, newNumber);
      widgetNumber.currentNumber = newNumber;
    } else {
      console.log('[w-' + widgetNumber.name + '] data is not a number.');
    }
  }
}

export class WidgetImage extends Widget {

  imageUrl: string;

  constructor(name: string,
              imageUrl: string,
              sizeX?: number,
              sizeY?: number) {
    super(name, '', WidgetType.Image, '', null, null, sizeX, sizeY);
    this.imageUrl = imageUrl;
  }

  update(widget: Widget, data: any) {
    const widgetImage = widget as WidgetImage;
    console.log('[w' + widgetImage.name + '] data update.');
    widgetImage.updateLastUpdatedString();

    if (typeof data === 'string') {
      widgetImage.imageUrl = data as string;
    } else {
      console.log('[w' + widgetImage.name + '] data is not a string.');
    }
  }
}

export class WidgetClock extends Widget {

  currentTime: Date;

  constructor(name: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string) {
    super(name, '', WidgetType.Clock, null, null, null, sizeX, sizeY, cardColor);
    this.currentTime = moment().toDate();
    moment.locale('de');
  }

  update(widget: Widget, data: any) {}

  updateCurrentTime() {
    this.currentTime = moment().toDate();
    this.title = moment().format('LTS');
    this.subtitle = moment().format('LL');
  }
}

export enum WidgetType {
  Text,
  Number,
  Image,
  Clock,
  Graph,
  Status,
  StatusImage,
  Switch,
  SwitchPlug,
  SwitchLight,
  SwitchScene
}
