import {WidgetType} from '../../enums/WidgetType';
import {IWidget} from '../../interfaces/IWidget';
import {WidgetBase} from './WidgetBase';

export class WidgetText extends WidgetBase {

  currentTextContent: string;

  constructor(name: string,
              title: string,
              subtitle?: string,
              dataPrefix?: string,
              dataSuffix?: string,
              sizeX?: number,
              sizeY?: number,
              cardColor?: string) {
    super(name,
      title,
      WidgetType.Text,
      subtitle,
      dataPrefix, dataSuffix, sizeX, sizeY, cardColor);
    this.currentTextContent = '';
  }

  update(widget: IWidget, data: any) {

  }
}
