import * as moment from 'moment';

export class Widget {
  id: number;
  name: string;
  type: WidgetType;
  title: string;
  subtitle: string;
  updatedAt: Date;

  constructor(id: number, name: string, title: string, subtitle: string, widgetType: WidgetType) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.subtitle = subtitle;
    this.updatedAt = moment().toDate();
    this.type = widgetType;
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

  constructor(id: number, name: string, title: string, subtitle: string) {
    super(id, name, title, subtitle, WidgetType.Text);
    this.id = id;
    this.name = name;
    this.currentTextContent = '';
  }
}

export class WidgetNumber extends Widget {


  currentNumber: number;
  constructor(id: number, name: string, title: string, subtitle: string) {
    super(id, name, title, subtitle, WidgetType.Number);
    this.id = id;
    this.name = name;
    this.currentNumber = -1;
  }
}

export class WidgetImage extends Widget {

  imageUrl: string;
  constructor(id: number, name: string, title: string, subtitle: string, url: string) {
    super(id, name, title, subtitle, WidgetType.Image);
    this.id = id;
    this.name = name;
    this.imageUrl = url;
  }
}

export enum WidgetType {
  Text,
  Number,
  Image
}
