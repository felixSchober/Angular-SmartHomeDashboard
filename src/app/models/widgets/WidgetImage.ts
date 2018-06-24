import { WidgetAction } from './../widgetAction';
import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import {WidgetBase} from './WidgetBase';

export class WidgetImage extends WidgetBase {

  imageUrl: string;

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
