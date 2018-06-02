import {StateChangeCommandTypes} from '../../enums/ActionButtonStateChangeCommandTypes';
import {WidgetType} from '../../enums/WidgetType';
import {SceneStateChangeCommand, WidgetAction} from '../widgetAction';
import {WidgetSwitch} from './WidgetSwitch';

export class WidgetSwitchScene extends WidgetSwitch {
  sceneId: string;
  groupId: string;

  constructor(name: string, title: string, sceneId: string, groupId: string, sizeX?: number, sizeY?: number, cardColor?: string) {
    super(name, title, WidgetType.SwitchScene, '', sizeX, sizeY, cardColor);
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
