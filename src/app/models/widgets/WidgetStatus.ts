import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../Interfaces/IWidget';
import {WidgetAction} from '../widgetAction';
import {WidgetBase} from './WidgetBase';

export class WidgetStatus extends WidgetBase {

  statusStates: string[];
  currentStatus: string;


  constructor(name: string, title: string, type: WidgetType, statusIcons?: string[],
              subtitle?: string, sizeX?: number, sizeY?: number, cardColor?: string,
              cardHeaderColor?: string, actions?: WidgetAction[]) {
    super(name, title, type, subtitle, null, null, sizeX, sizeY, cardColor, cardHeaderColor, actions);

    if (this.type === WidgetType.Status) {
      this.statusStates = statusIcons || ['power', 'power_off'];
      this.currentStatus = 'not_interested';
    } else {
      this.statusStates = statusIcons || [];
      this.currentStatus = this.statusStates.length > 0 ? this.statusStates[0] : 'not_interested';
    }

  }

  update(widget: IWidget, data: any) {
    const widgetStatus = widget as WidgetStatus;
    widgetStatus.updateLastUpdatedString();

    if (typeof data === 'number') {
      const newStatusIndex = data as number;

      if (newStatusIndex >= widgetStatus.statusStates.length) {
        throw new TypeError('Status update for ' + widgetStatus.name + ' is invalid. ' +
          'Got Index ' + newStatusIndex + '. Length of status array: ' + widgetStatus.statusStates.length);
      }
      widgetStatus.currentStatus = widgetStatus.statusStates[newStatusIndex];
      console.log('[w' + widgetStatus.name + '] data update: ' + newStatusIndex + '. new status: ' + widgetStatus.currentStatus);

    } else if (typeof data === 'boolean') {
      const newStatus = data as boolean;

      // new status index = 0 means off. Status 1 is on
      let newStatusIndex = 0;
      if (newStatus) {
        newStatusIndex = 1;
      }

      widgetStatus.currentStatus = widgetStatus.statusStates[newStatusIndex];
      console.log('[w' + widgetStatus.name + '] data update: ' + newStatusIndex + '. new status: ' + widgetStatus.currentStatus);
    } else {
      console.log('[w' + widgetStatus.name + '] data is not a number.');
    }
  }
}
