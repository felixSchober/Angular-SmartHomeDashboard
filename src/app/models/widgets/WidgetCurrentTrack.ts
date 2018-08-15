import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import {WidgetAction} from '../widgetAction';
import {WidgetBase} from './WidgetBase';
import { ITrack } from '../../interfaces/ITrack';

export class WidgetCurrentTrack extends WidgetBase {


  song: string;
  artist: string;
  album: string;

  static parser = function(data: any): IWidget {
    if (data.type !== 'musicTrack') {
      throw Error('Widget type is not musicTrack');
    }

    if (!data.name) {
      throw Error('Could not create musicTrack widget: Name is not set');
    }

    const actions = WidgetAction.parseActionArray(data.actions);

    return new WidgetCurrentTrack(data.name, data.sizeX, data.sizeY, data.cardColor, data.headerColor, actions);
  };

  constructor(name: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string,
              cardHeaderColor?: string,
              actions?: WidgetAction[]) {
    super(name, '', WidgetType.MusicTrack,
      '', null, null, sizeX, sizeY, cardColor, cardHeaderColor, actions);

      this.song = '';
      this.album = '';
      this.artist = '';
  }

  update(widget: IWidget, data: any) {
    const widgetCurrentTrack = widget as WidgetCurrentTrack;
    widgetCurrentTrack.updateLastUpdatedString();

    const currentTrack = data as ITrack;
    if (!currentTrack) {
        console.log('[w-' + widgetCurrentTrack.name + '] data is not a track info.');
    }

    this.song = currentTrack.name;
    this.album = currentTrack.album;
    this.artist = currentTrack.artist;
  }
}
