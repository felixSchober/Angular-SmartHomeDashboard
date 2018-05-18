import {Widget} from './widget';

export class WidgetAction {
  title: string;
  executionFunction: (sender: Widget) => Promise<any>;
  socketTopic: string;
  socketMessage: string;
  canExecuteFunction: () => boolean;
  color: string;
  type: ActionButtonType;
  disabled: boolean;

  constructor(title: string,
              type: ActionButtonType,
              socketTopic?: string,
              socketMessage?: string,
              execution?: (sender: Widget) => Promise<any>,
              canExecute?: () => boolean,
              color?: string) {
    this.title = title;
    this.executionFunction = execution;
    this.socketTopic = socketTopic || '';
    this.socketMessage = socketMessage || '';
    this.canExecuteFunction = canExecute;
    this.color = color || 'primary';
    this.type = type;
    this.disabled = !this.canExecute();

    console.log('Action ' + this.title + ' created with type ' + type);
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

  execute(sender: Widget) {
    // stop if not allowed to execute
    if (!this.canExecute()) {
      console.log('Function can not execute.');
      return;
    }

    if (this.socketTopic && this.socketMessage) {
      console.log('Send Message ' + this.socketMessage + ' to Topic ' + this.socketTopic);
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
  }
}

export enum ActionButtonType {
  Basic,
  Raised,
  Icon,
  Fab,
  MiniFab
}
