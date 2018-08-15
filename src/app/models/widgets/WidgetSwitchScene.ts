import {StateChangeCommandTypes} from '../../enums/ActionButtonStateChangeCommandTypes';
import {WidgetType} from '../../enums/WidgetType';
import {SceneStateChangeCommand, WidgetAction} from '../widgetAction';
import {WidgetSwitch} from './WidgetSwitch';
import { IWidget } from '../../interfaces/IWidget';

export class WidgetSwitchScene extends WidgetSwitch {
  sceneId: string;
  groupId: string;

  static parser = function(data: any): IWidget {
    if (data.type !== 'switchScene') {
      throw Error('Widget type is not switchScene');
    }

    if (!data.name) {
      throw Error('Could not create switchScene widget: Name is not set');
    }

    if (!data.title) {
      throw Error('Could not create switchScene widget: Title is not set');
    }

    if (!data.sceneId) {
      throw Error('Could not create swiswitchScenetch widget: deviceName is not set');
    }

    if (!data.groupId) {
      throw Error('Could not create swiswitchScenetch widget: deviceName is not set');
    }

    const icons = data.icons;

    return new WidgetSwitchScene(data.name, data.title, data.sceneId, data.groupId,
      data.sizeX, data.sizeY, data.cardColor);
  };

  constructor(name: string, title: string, sceneId: string, groupId: string, sizeX?: number, sizeY?: number, cardColor?: string) {
    super(name, title, WidgetType.SwitchScene, '', null, null, sizeX, sizeY, cardColor);
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
