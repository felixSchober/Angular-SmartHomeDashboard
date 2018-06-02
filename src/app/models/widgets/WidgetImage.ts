import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../Interfaces/IWidget';
import {WidgetBase} from './WidgetBase';

export class WidgetImage extends WidgetBase {

  imageUrl: string;

  constructor(name: string,
              imageUrl: string,
              sizeX?: number,
              sizeY?: number) {
    super(name, '', WidgetType.Image, '', null, null, sizeX, sizeY);
    this.imageUrl = imageUrl;
  }

  update(widget: IWidget, data: any) {
    const widgetImage = widget as WidgetImage;
    console.log('[w' + widgetImage.name + '] data update.');
    widgetImage.updateLastUpdatedString();

    if (typeof data === 'string') {
      widgetImage.imageUrl = data as string;
    } else {
      console.log('[w' + widgetImage.name + '] data is not a string.');
    }
  }
}
