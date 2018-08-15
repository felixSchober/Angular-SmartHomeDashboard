import {StateChangeCommandTypes} from '../enums/ActionButtonStateChangeCommandTypes';
import {ActionButtonType} from '../enums/ActionButtonType';
import {ISceneStateChangeCommand} from '../interfaces/ISceneStateChangeCommand';
import {ISocketMessage} from '../interfaces/ISocketMessage';
import {ISwitchStateChangeCommand} from '../interfaces/ISwitchStateChangeCommand';
import {IWidget} from '../interfaces/IWidget';
import { TabNavigationService } from '../services/tab-navigation.service';
import { TopicDataService } from '../services/topic-data.service';
import { WidgetType } from '../enums/WidgetType';

export class WidgetAction {
  title: string;
  executionFunction: (sender: IWidget, dataService: TopicDataService) => Promise<any>;
  socketTopic: string;
  socketMessage: any;
  canExecuteFunction: () => boolean;
  color: string;
  type: ActionButtonType;
  disabled: boolean;
  tabDestinationIndex: number;
  tabNavigationService: TabNavigationService;
  dataService: TopicDataService;
  audio: HTMLAudioElement;

  static parseActionArray(data: ReadonlyArray<any>): WidgetAction[] {
    const result: WidgetAction[] = [];
    if (!data) {
      return [];
    }

    data.forEach(actionData => {
      result.push(WidgetAction.parseAction(actionData));
    });
    return result;
  }

  private static parseAction(data: any): WidgetAction {

    if (!data.type) {
      throw Error('Could not create action. data type was not set');
    }

    // parse action type
    const buttonType: ActionButtonType = ActionButtonType['' + data.type];

    if (!buttonType) {
      throw Error('Could not create action. data type could not be parsed');
    }
    let title: string;
    if (buttonType !== ActionButtonType.Primary) {
      if (!data.title) {
        throw Error('Could not create action. title was not set');
      }
      title = data.title;
    } else {
      title = '';
    }

    return new WidgetAction(title, buttonType, data.tabDestinationIndex, data.socketTopic, data.socketMessage);
  }

  public static getPrimarySwitchAction(type: WidgetType, deviceName: string): WidgetAction {
    let socketTopic = '';
    let socketCommand: SwitchStateChangeCommand;

    if (type === WidgetType.SwitchLight) {

      socketTopic = 'lights';
      socketCommand = new SwitchStateChangeCommand(deviceName, StateChangeCommandTypes.toggle);

    } else if (type === WidgetType.SwitchPlug) {

      socketTopic = 'power';
      socketCommand = new SwitchStateChangeCommand(deviceName, StateChangeCommandTypes.toggle);

    } else if (type === WidgetType.SwitchHarmony) {

      socketTopic = 'harmony_activity';
      socketCommand = new SwitchStateChangeCommand(deviceName, StateChangeCommandTypes.on);

    } else if (type === WidgetType.SwitchMusic) {

      socketTopic = 'music_player';
      socketCommand = new SwitchStateChangeCommand(deviceName, StateChangeCommandTypes.toggle);

    } else if (type === WidgetType.SwitchScene) {
      // do nothing.. the action will be initialized later.
      return null;
    } else {
      throw new Error('Unknown Switch Type: ' + WidgetType[type] + '. ' +
        'Only WidgetType.SwitchLight & WidgetType.SwitchPlug are allowed.');
    }

    // add a build-in primary action to change the status of the light
    return new WidgetAction('', ActionButtonType.Primary, null, socketTopic, socketCommand);
  }

  constructor(title: string,
              type: ActionButtonType,
              tabDestinationIndex?: number,
              socketTopic?: string,
              socketMessage?: any,
              execution?: (sender: IWidget) => Promise<any>,
              canExecute?: () => boolean,
              color?: string) {
    this.title = title;
    this.executionFunction = execution;
    this.socketTopic = socketTopic || '';
    this.socketMessage = socketMessage || {};
    this.canExecuteFunction = canExecute;
    this.color = color || 'primary';
    this.type = type;
    this.disabled = !this.canExecute();
    this.tabDestinationIndex = tabDestinationIndex || -1;

    const audioNumber = Math.floor(Math.random() * 6) + 1;
    const audioPath = `assets/beep${audioNumber}.mp3`;
    this.audio = new Audio(audioPath);

    console.log('Action ' + this.title + ' created with type ' + type);
  }

  // inject navigation service into action
  setTabNavigationService(tabNavigationService: TabNavigationService) {
    this.tabNavigationService = tabNavigationService;
  }

  // inject topic data service into action
  setTopicDataService(dataService: TopicDataService) {
    this.dataService = dataService;
  }

  canExecute() {
    if (this.canExecuteFunction) {
      return !this.canExecuteFunction();
    }
    return true;
  }

  raiseCanExecuteChanged() {
    this.disabled = this.canExecute();
  }

  execute(sender: IWidget, e: any) {
    // secondary actions will have a mouse event. In this case we need to stop propagation to the
    // card element because otherwise a possible primary action might be triggered.
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    // stop if not allowed to execute
    if (!this.canExecute()) {
      console.log('Function can not execute.');
      return false;
    }

    this.audio.load();
    this.audio.play();

    // navigate to tab if this was set
    this.navigate();

    if (this.socketTopic && this.socketMessage) {
      if (!this.dataService) {
        throw new Error('DataService was not injected properly.');
      }

      console.log('Send Message ' + this.socketMessage + ' to Topic ' + this.socketTopic);

      const message: ISocketMessage = {
        topic: this.socketTopic,
        data: this.socketMessage
      };
      this.dataService.sendData(message);
    }

    if (this.executionFunction) {
      console.log('Execute function');
      this.executionFunction(sender, this.dataService)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return false;
  }

  navigate() {
    // stop if no target is set
    if (this.tabDestinationIndex === -1) {
      return;
    }

    // target is set but tab navigation service was not injected (set)
    if (!this.tabNavigationService) {
      throw new Error('Tab Destination tabIndex is set to ' + this.tabDestinationIndex +
        ' but the tab navigation service was not set (injected).');
    }

    // stop if not allowed to execute
    if (!this.canExecute()) {
      console.log('Function can not execute.');
      return;
    }

    this.tabNavigationService.changeTab(this.tabDestinationIndex);
  }
}


export class SwitchStateChangeCommand implements ISwitchStateChangeCommand {
  name: string;
  state: string;

  constructor(name: string, state: StateChangeCommandTypes) {
    this.name = name;
    this.state = StateChangeCommandTypes[state];
  }
}

export class SceneStateChangeCommand extends SwitchStateChangeCommand implements ISceneStateChangeCommand {
  groupId: string;
  sceneId: string;

  constructor(name: string, state: StateChangeCommandTypes, groupId: string, sceneId: string) {
    super(name, state);
    this.groupId = groupId;
    this.sceneId = sceneId;
  }
}
