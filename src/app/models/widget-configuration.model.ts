import {IWidget} from '../interfaces/IWidget';

export class WidgetConfigurationModel {
  public name: string;
  public icon: string;
  public widgets: IWidget[];
  public tabIndex: number;


  constructor(name: string, icon: string, tabIndex: number) {
    this.name = name;
    this.icon = icon;
    this.widgets = [];
    this.tabIndex = tabIndex;
  }

  public addWidget(widget: IWidget) {
    this.widgets.push(widget);
  }
}
