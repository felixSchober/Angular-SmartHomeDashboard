import * as moment from 'moment';
import {ActionButtonType, WidgetAction} from './widgetAction';

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

    console.log('Widget ' + this.name + ' (' + this.type + ') created with ' + this.cardWidth + 'x' + this.cardHeight);
  }

  private getLastUpdatedString(): string {
    return moment(this.updatedAt).calendar();
  }

  updateLastUpdatedString() {
      this.updatedAt = new Date();
      this.updatedAtString = this.getLastUpdatedString();
  }

  abstract update(widget: Widget, data: any): void;

  onSelect(widget: Widget): void {
    this.name += ' - ';
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
    console.log('[w' + widgetNumber.name + '] data update.');
    widgetNumber.updateLastUpdatedString();

    if (typeof data === 'number') {
      const newNumber = data as number;
      widgetNumber.lowValue = Math.min(widgetNumber.currentNumber, newNumber);
      widgetNumber.highValue = Math.min(widgetNumber.currentNumber, newNumber);
      widgetNumber.currentNumber = newNumber;
    } else {
      console.log('[w' + widgetNumber.name + '] data is not a number.');
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
    console.log('[w' + this.id + '] data update.');
    this.updateLastUpdatedString();

    if (typeof data === 'string') {
      this.imageUrl = data as string;
    } else {
      console.log('[w' + this.id + '] data is not a number.');
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
  Graph
}
