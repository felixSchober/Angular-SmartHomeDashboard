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

      socketTopic = 'lightState';
      socketCommand = new SwitchStateChangeCommand(this.deviceName, StateChangeCommandTypes.toggle);
      this.statusStates = ['power_off', 'wb_sunny'];

    } else if (this.subType === WidgetType.SwitchPlug) {

      socketTopic = 'plugState';
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