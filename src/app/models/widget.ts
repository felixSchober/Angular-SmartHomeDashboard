import * as moment from 'moment';
import { WidgetAction } from './widgetAction';

let currentWidgetId = 0;
const standardCardWidth = 185;
const standardCardHeight = 150;
const cardMargin = 48; // margin 24 on both sides -> 48
const cardGridPadding = 16; // 8 on both sides

export class Widget {
  id: number;
  name: string;
  type: WidgetType;
  title: string;
  subtitle: string;
  updatedAt: Date;
  sizeX: number;
  sizeY: number;
  dataPrefix: string;
  dataSuffix: string;
  cardColor: string;
  cardWidth: number;
  cardHeight: number;
  actions: WidgetAction[];

  constructor(name: string,
              title: string,
              widgetType: WidgetType,
              subtitle?: string,
              dataPrefix?: string,
              dataSuffix?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string) {
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
    this.cardColor = cardColor || '#4CAF50';

    this.actions = [];

    console.log('Widget ' + this.name + ' (' + this.type + ') created with ' + this.cardWidth + 'x' + this.cardHeight);
  }

  getLastUpdatedString(): string {
    return moment(this.updatedAt).calendar();
  }

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
}

export class WidgetNumber extends Widget {


  currentNumber: number;

  constructor(name: string,
              title: string,
              subtitle?: string,
              dataPrefix?: string,
              dataSuffix?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string) {
    super(name, title, WidgetType.Number, subtitle, dataPrefix, dataSuffix, sizeX, sizeY, '#B00020');
    this.currentNumber = 24;
  }
}

export class WidgetImage extends Widget {

  imageUrl: string;

  constructor(name: string,
              title: string,
              subtitle?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string) {
    super(name, title, WidgetType.Image, subtitle, null, null, sizeX, sizeY, cardColor);
    this.imageUrl = '';
  }
}

export class WidgetClock extends Widget {

  currentTime: Date;
  currentTimeFormat: string;

  constructor(name: string,
              sizeX: number,
              sizeY: number) {
    super(name, '', WidgetType.Clock);
    this.currentTime = moment().toDate();
  }

  updateCurrentTime() {
    this.currentTime = moment().toDate();
    this.title = moment().format('hh:mm:ss');
    this.subtitle = moment().format('DD.MM.YY');
    console.log('tick....');

    setTimeout(this.updateCurrentTime, 1000);
  }
}

export enum WidgetType {
  Text,
  Number,
  Image,
  Clock
}
