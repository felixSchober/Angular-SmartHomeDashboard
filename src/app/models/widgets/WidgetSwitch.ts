import {StateChangeCommandTypes} from '../../enums/ActionButtonStateChangeCommandTypes';
import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import { SwitchStateChangeCommand, WidgetAction} from '../widgetAction';
import {WidgetStatus} from './WidgetStatus';

export class WidgetSwitch extends WidgetStatus {

  // weather this is a light, plug or scene switch
  subType: WidgetType;
  currentStateIsOn: boolean;
  deviceName: string;

  static parser = function(data: any): IWidget {
    if (data.type !== 'switch' && data.type !== 'switchPlug') {
      throw Error('Widget type is not switch or switchPlug');
    }

    if (!data.name) {
      throw Error('Could not create switch widget: Name is not set');
    }

    if (!data.title) {
      throw Error('Could not create switch widget: Title is not set');
    }

    if (!data.deviceName) {
      throw Error('Could not create switch widget: deviceName is not set');
    }

    const widgetType = data.type === 'switch' ? WidgetType.SwitchLight : WidgetType.SwitchPlug;

    return new WidgetSwitch(data.name, data.title, widgetType, data.deviceName,
      data.sizeX, data.sizeY, data.color);
  };

  constructor(name: string, title: string, subType: WidgetType, deviceName: string, sizeX?: number, sizeY?: number, cardColor?: string) {
    super(name, title, WidgetType.Switch, null, null, sizeX, sizeY, cardColor, cardColor, null);

    this.deviceName = deviceName;
    this.subType = subType;
    this.primaryAction = WidgetAction.getPrimarySwitchAction(subType, this.deviceName);
    this.actions = [this.primaryAction];
  }


  update(widget: IWidget, data: any): void {
    super.update(widget, data);

    const widgetSwitch = widget as WidgetSwitch;
    // set internal state
    if (typeof data === 'boolean') {
      widgetSwitch.currentStateIsOn = data as boolean;
    } else if (typeof data === 'number') {
      const numericState = data as number;
      widgetSwitch.currentStateIsOn = numericState === 1;
    }
  }
}
