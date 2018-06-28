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
    this.primaryAction = this.getPrimaryCommand();
    this.actions = [this.primaryAction];
  }

  protected getPrimaryCommand(): WidgetAction {
    let socketTopic = '';
    let socketCommand: SwitchStateChangeCommand;

    if (this.subType === WidgetType.SwitchLight) {

      socketTopic = 'lights';
      socketCommand = new SwitchStateChangeCommand(this.deviceName, StateChangeCommandTypes.toggle);
      this.statusStates = ['power_off', 'wb_sunny'];

    } else if (this.subType === WidgetType.SwitchPlug) {

      socketTopic = 'power';
      socketCommand = new SwitchStateChangeCommand(this.deviceName, StateChangeCommandTypes.toggle);
      this.statusStates = ['power_off', 'power'];

    } else if (this.subType === WidgetType.SwitchScene) {
      // do nothing.. the action will be initialized later.
      return null;
    } else {
      throw new Error('Unknown Switch Type: ' + WidgetType[this.subType] + '. ' +
        'Only WidgetType.SwitchLight & WidgetType.SwitchPlug are allowed.');
    }

    // add a build-in primary action to change the status of the light
    return new WidgetAction('', this.ActionButtonType.Primary, null, socketTopic, socketCommand);
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
