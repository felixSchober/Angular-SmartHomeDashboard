import {ISwitchStateChangeCommand} from './ISwitchStateChangeCommand';

export interface ISceneStateChangeCommand extends ISwitchStateChangeCommand {
  groupId: string;
  sceneId: string;
}
