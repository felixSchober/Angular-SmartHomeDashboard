import { Widget, WidgetType } from './widget';
import {ActionButtonType, WidgetAction} from './widgetAction';

export class WidgetStatus extends Widget {

  statusIcons: string[];
  currentStatus: string;


  constructor(name: string, title: string, statusIcons?: string[], subtitle?: string, sizeX?: number, sizeY?: number, cardColor?: string,
              cardHeaderColor?: string, actions?: WidgetAction[]) {
    super(name, title, WidgetType.Status, subtitle, null, null, sizeX, sizeY, cardColor, cardHeaderColor, actions);
    this.statusIcons = statusIcons || ['power', 'power_off'];
    this.currentStatus = 'not_interested';
  }

  update(widget: Widget, data: any) {
    const widgetStatus = widget as WidgetStatus;
    widgetStatus.updateLastUpdatedString();

    if (typeof data === 'number') {
      const newStatusIndex = data as number;
      console.log('[w' + widgetStatus.name + '] data update: ' + newStatusIndex);

      if (newStatusIndex >= widgetStatus.statusIcons.length) {
        throw new TypeError('Status update for ' + widgetStatus.name + ' is invalid. ' +
          'Got Index ' + newStatusIndex + '. Length of status array: ' + widgetStatus.statusIcons.length);
      }
      widgetStatus.currentStatus = widgetStatus.statusIcons[newStatusIndex];
    } else {
      console.log('[w' + widgetStatus.name + '] data is not a number.');
    }
  }
}
