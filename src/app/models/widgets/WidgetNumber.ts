import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import {WidgetAction} from '../widgetAction';
import {WidgetBase} from './WidgetBase';

export class WidgetNumber extends WidgetBase {


  currentNumber: number;
  numberPrecision: number;
  showHighLow: boolean;
  highValue: number;
  lowValue: number;

  static parser = function(data: any): IWidget {
    if (data.type !== 'number') {
      throw Error('Widget type is not number');
    }

    if (!data.name) {
      throw Error('Could not create number widget: Name is not set');
    }

    if (!data.title) {
      throw Error('Could not create number widget: Title is not set');
    }

    const actions = WidgetAction.parseActionArray(data.actions);

    return new WidgetNumber(data.name, data.title, data.subtitle, data.numberPrecision, data.dataPrefix, data.dataSuffix,
      data.sizeX, data.sizeY, data.cardColor, data.headerColor, actions, data.showHighLow);
  };

  constructor(name: string,
              title: string,
              subtitle?: string,
              numberPrecision?: number,
              dataPrefix?: string,
              dataSuffix?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string,
              cardHeaderColor?: string,
              actions?: WidgetAction[],
              showHighLow?: boolean) {
    super(name, title, WidgetType.Number,
      subtitle, dataPrefix, dataSuffix, sizeX, sizeY, cardColor, cardHeaderColor, actions);
    this.currentNumber = -1;
    this.numberPrecision = numberPrecision || 0;
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
