import { WidgetAction } from './../widgetAction';
import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import {WidgetBase} from './WidgetBase';

export class WidgetImage extends WidgetBase {

  private readonly imageBasePath = '/assets/images/';

  imageUrl: string;
  baseImageUrl: string;
  imageUpdatePrefix: string;
  isSwitch: boolean;
  deviceName: string;

  static parser = function(data: any): IWidget {
    if (data.type !== 'image' && data.type !== 'imageSwitch') {
      throw Error('Widget type is not image or imageSwitch');
    }

    if (!data.name) {
      throw Error('Could not create image widget: Name is not set');
    }

    const actions = WidgetAction.parseActionArray(data.actions);

    return new WidgetImage(data.name,
      data.imageUrl,
      (data.type === 'imageSwitch'),
      data.imageUpdatePrefix,
      data.deviceName,
      data.sizeX,
      data.sizeY,
      actions);
  };

  constructor(name: string,
              imageName: string,
              isSwitch: boolean,
              imageUpdatePrefix?: string,
              deviceName?: string,
              sizeX?: number,
              sizeY?: number,
              actions?: WidgetAction[]) {
    super(name, '', WidgetType.Image, '', null, null, sizeX, sizeY, null, null, actions);
    this.isSwitch = isSwitch;
    this.imageUpdatePrefix = imageUpdatePrefix || '';
    this.baseImageUrl = imageName;
    this.deviceName = deviceName || '';

    if (isSwitch) {
      if (!deviceName) {
        console.warn(`[w${this.name}] is a switch but device name is null. This widget won't be able to switch the device on or off.`);
      } else {
        this.primaryAction = WidgetAction.getPrimarySwitchAction(WidgetType.SwitchHarmony, this.deviceName);
        this.actions = [this.primaryAction];
      }

      this.imageUrl = this.imageBasePath + this.imageUpdatePrefix + 'off/' + this.baseImageUrl;

    } else {
      this.imageUrl = this.imageBasePath + this.imageUpdatePrefix + this.baseImageUrl;
    }
  }

  update(widget: IWidget, data: any) {
    const widgetImage = widget as WidgetImage;
    console.log('[w' + widgetImage.name + '] data update.');
    widgetImage.updateLastUpdatedString();

    if (typeof data === 'boolean') {
      const status = data as boolean;

      // on
      if (status) {
        widgetImage.imageUrl = this.imageBasePath + this.imageUpdatePrefix + 'on/' + this.baseImageUrl;
      } else {
        widgetImage.imageUrl = this.imageBasePath + this.imageUpdatePrefix + 'off/' + this.baseImageUrl;
      }
    }

    if (typeof data === 'string') {
      let url = data as string;

      // TODO: Cleanup this mess
      if (url.startsWith('http') || url.startsWith('assets')) {     // is the data string a url?
        widgetImage.imageUrl = url;
      } else {                                                      // append with local path to images
        if (url.endsWith('png') || url.endsWith('jpg') || url.endsWith('jpeg') || url.endsWith('gif')) {
          // url = this.imageBasePath + url;
        } else {
          url += '.png';
        }
        widgetImage.imageUrl = this.imageBasePath + this.imageUpdatePrefix + url;
      }
    } else {
      console.log('[w' + widgetImage.name + '] data is not a string.');
    }
  }
}
