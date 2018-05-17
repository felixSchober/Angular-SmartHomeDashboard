import * as moment from 'moment';

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

  constructor(id: number,
              name: string,
              title: string,
              subtitle: string,
              dataPrefix: string,
              dataSuffix: string,
              sizeX: number,
              sizeY: number,
              widgetType: WidgetType) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.subtitle = subtitle;
    this.updatedAt = moment().toDate();
    this.type = widgetType;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  getType(): WidgetType {
    return this.type;
  }

  onSelect(widget: Widget): void {
    this.name += ' - ';
  }
}

export class WidgetText extends Widget {

  currentTextContent: string;

  constructor(id: number,
              name: string,
              title: string,
              subtitle: string,
              dataPrefix: string,
              dataSuffix: string,
              sizeX: number,
              sizeY: number) {
    super(id, name, title, subtitle, dataPrefix, dataSuffix, sizeX, sizeY, WidgetType.Text);
    this.currentTextContent = '';
  }
}

export class WidgetNumber extends Widget {


  currentNumber: number;

  constructor(id: number,
              name: string,
              title: string,
              subtitle: string,
              dataPrefix: string,
              dataSuffix: string,
              sizeX: number,
              sizeY: number) {
    super(id, name, title, subtitle, dataPrefix, dataSuffix, sizeX, sizeY, WidgetType.Number);
    this.currentNumber = -1;
  }
}

export class WidgetImage extends Widget {

  imageUrl: string;

  constructor(id: number,
              name: string,
              title: string,
              subtitle: string,
              sizeX: number,
              sizeY: number,
              url: string) {
    super(id, name, title, subtitle, '', '', sizeX, sizeY, WidgetType.Image);
    this.imageUrl = url;
  }
}

export class WidgetClock extends Widget {

  currentTime: Date;
  currentTimeFormat: string;

  constructor(id: number,
              name: string,
              sizeX: number,
              sizeY: number) {
    super(id, name, '', '', '', '', sizeX, sizeY, WidgetType.Clock);
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
