import { Widget, WidgetType } from './widget';
import {
  ActionButtonType,
  SceneStateChangeCommand,
  StateChangeCommandTypes,
  SwitchStateChangeCommand,
  WidgetAction
} from './widgetAction';
//import * as morpheus from 'svg-morpheus';

export class WidgetStatus extends Widget {

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

  update(widget: Widget, data: any) {
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

  update(widget: Widget, data: any): void {
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

export class WidgetSwitchScene extends WidgetSwitch {
  sceneId: string;
  groupId: string;

  constructor(name: string, title: string, sceneId: string, groupId: string, sizeX?: number, sizeY?: number, cardColor?: string) {
    super(name, title, WidgetType.SwitchScene, sizeX, sizeY, cardColor);
    this.statusStates = ['filter', 'collections'];
    this.sceneId = sceneId;
    this.groupId = groupId;

    this.primaryAction = this.getPrimaryCommand();
    this.actions = [this.primaryAction];
  }


  protected getPrimaryCommand(): WidgetAction {
    const socketTopic = 'lightState_scene';
    const socketCommand = new SceneStateChangeCommand(this.name, StateChangeCommandTypes.toggle,
                                                      this.groupId, this.sceneId);

    // add a build-in primary action to change the status of the scene
    return new WidgetAction('', this.ActionButtonType.Primary, null, socketTopic, socketCommand);
  }
}
