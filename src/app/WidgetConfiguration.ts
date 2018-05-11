import { Widget, WidgetImage, WidgetNumber, WidgetText } from './widget';

export const WIDGETS: Widget[][] = [
  [
    new WidgetNumber(1, 'A', 'AA', 'AAA'),
    new WidgetNumber(2, 'A', 'AA', 'AAA'),
    new WidgetNumber(3, 'A', 'AA', 'AAAAAA')
  ],
  [
    new WidgetImage(4, 'MyImage', 'Logo', '', '')
  ]
];
