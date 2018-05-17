import { Widget, WidgetImage, WidgetNumber, WidgetText, WidgetClock } from './widget';

export const WIDGETS: Widget[][] = [
  [
    new WidgetClock(0, 'TestClock', 2, 1),
    new WidgetNumber(1, 'A', 'AA', 'AAA', '', '', 2, 2),
    new WidgetNumber(2, 'A', 'AA', 'AAA', '', '', 1, 2),
    new WidgetNumber(3, 'A', 'AA', 'AAAAAA', '', '', 1, 2)
  ],
  [
    new WidgetImage(4, 'MyImage', 'Logo', '', 2, 2, '')
  ]
];
