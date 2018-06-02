import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../Interfaces/IWidget';
import {WidgetBase} from './WidgetBase';
import * as moment from 'moment';

export class WidgetClock extends WidgetBase {

  currentTime: Date;

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
