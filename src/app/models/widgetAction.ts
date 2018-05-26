import {Widget} from './widget';
import { TabNavigationService } from '../services/tab-navigation.service';
import { TopicDataService } from '../services/topic-data.service';

export class WidgetAction {
  title: string;
  executionFunction: (sender: Widget) => Promise<any>;
  socketTopic: string;
  socketMessage: any;
  canExecuteFunction: () => boolean;
  color: string;
  type: ActionButtonType;
  disabled: boolean;
  tabDestinationIndex: number;
  tabNavigationService: TabNavigationService;
  dataService: TopicDataService;

  constructor(title: string,
              type: ActionButtonType,
              tabDestinationIndex?: number,
              socketTopic?: string,
              socketMessage?: any,
              execution?: (sender: Widget) => Promise<any>,
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

  execute(sender: Widget, e: any) {
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

    // navigate to tab if this was set
    this.navigate();

    if (this.socketTopic && this.socketMessage) {
      console.log('Send Message ' + this.socketMessage + ' to Topic ' + this.socketTopic);
      const message = {
        topic: this.socketTopic,
        data: this.socketMessage
      };
      this.dataService.sendData(message);
    }

    if (this.executionFunction) {
      console.log('Execute function');
      this.executionFunction(sender)
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
      throw new Error('Tab Destination index is set to ' + this.tabDestinationIndex +
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

export enum ActionButtonType {
  Basic,
  Raised,
  Icon,
  Fab,
  MiniFab,
  Primary // whole card
}
