import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import {WidgetAction} from '../widgetAction';
import {WidgetBase} from './WidgetBase';

export class WidgetNumber extends WidgetBase {


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
    this.currentNumber = -1;
    this.showHighLow = showHighLow || false;
    if (this.showHighLow) {
      this.highValue = Number.MIN_SAFE_INTEGER;
      this.lowValue = Number.MAX_SAFE_INTEGER;
    }
  }

  update(widget: IWidget, data: any) {
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
