import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import {WidgetBase} from './WidgetBase';
import * as moment from 'moment';

export class WidgetClock extends WidgetBase {

  currentTime: Date;

  static parser = function(data: any): WidgetClock {
    if (data.type !== 'clock') {
      throw Error('Widget type is not clock');
    }

    if (!data.name) {
      throw Error('Could not create clock widget: Name is not set');
    }

    return new WidgetClock(data.name, data.sizeX, data.sizeY, data.color);
  };

  constructor(name: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string) {
    super(name, '', WidgetType.Clock, null, null, null, sizeX, sizeY, cardColor);
    this.currentTime = moment().toDate();
    moment.locale('de');
  }

  update(widget: IWidget, data: any) {}

  updateCurrentTime() {
    this.currentTime = moment().toDate();
    this.title = moment().format('LTS');
    this.subtitle = moment().format('LL');
  }

  
}
