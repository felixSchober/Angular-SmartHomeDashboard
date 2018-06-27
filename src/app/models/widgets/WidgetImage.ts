import { WidgetAction } from './../widgetAction';
import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import {WidgetBase} from './WidgetBase';

export class WidgetImage extends WidgetBase {

  imageUrl: string;

  static parser = function(data: any): IWidget {
    if (data.type !== 'image') {
      throw Error('Widget type is not image');
    }

    if (!data.name) {
      throw Error('Could not create image widget: Name is not set');
    }
    const actions = WidgetAction.parseActionArray(data.actions);

    return new WidgetImage(data.name, data.imageUrl, data.sizeX, data.sizeY, actions);
  };

  constructor(name: string,
              imageUrl: string,
              sizeX?: number,
              sizeY?: number,
              actions?: WidgetAction[]) {
    super(name, '', WidgetType.Image, '', null, null, sizeX, sizeY, null, null, actions);
    this.imageUrl = imageUrl;
  }

  update(widget: IWidget, data: any) {
    const widgetImage = widget as WidgetImage;
    console.log('[w' + widgetImage.name + '] data update.');
    widgetImage.updateLastUpdatedString();

    if (typeof data === 'string') {
      let url = data as string;

      // TODO: Cleanup this mess
      if (url.startsWith('http') || url.startsWith('assets')) {     // is the data string a url?
        widgetImage.imageUrl = url;
      } else {                                                      // append with local path to images
        if (url.endsWith('png') || url.endsWith('jpg') || url.endsWith('jpeg') || url.endsWith('gif')) {
          url = '/assets/images/' + url;
        } else {
          url = '/assets/images/' + url + '.png';
        }
        widgetImage.imageUrl = url;
      }
    } else {
      console.log('[w' + widgetImage.name + '] data is not a string.');
    }
  }
}
