import { Widget, WidgetImage, WidgetNumber, WidgetText, WidgetClock } from './widget';
import {ActionButtonType, WidgetAction} from './widgetAction';
import {WidgetGraph, WidgetGraphType} from './widgetGraph';

const incrementNumber = function (sender: any) {
  return new Promise((resolve, reject) => {
    // is sender a widget?
    this.disabled = true;
    if (sender instanceof WidgetNumber) {
      const senderWidget = sender as WidgetNumber;
      senderWidget.currentNumber++;
      resolve(senderWidget.currentNumber);
    } else {
      reject('Sender is not a numberWidget');
    }
  });
};

const basicButton = new WidgetAction('Basic', ActionButtonType.Basic, 'Topic', 'Message', incrementNumber);
const raisedButton = new WidgetAction('Raised', ActionButtonType.Raised, '', '', incrementNumber);
const iconButton = new WidgetAction('favorite', ActionButtonType.Icon, '', '', incrementNumber);
const fabButton = new WidgetAction('Fab', ActionButtonType.Fab, '', '', incrementNumber);
const miniFab = new WidgetAction('Mini fab', ActionButtonType.MiniFab, '', '', incrementNumber);

const clockWidget = new WidgetClock('TestClock', 2, 1, '#4CAF50');
const graphWidget = new WidgetGraph('TestGraph', 'Test Title', WidgetGraphType.line, null, '', '', 'W', 2, 1, null, '#FFF');

export const WIDGETS: Widget[][] = [
  [
    clockWidget,
    new WidgetNumber('A', 'Temperature', 'Test', '', '°', 2, 1, '#FFF', '#4CAF50', [basicButton, raisedButton], false),
    new WidgetNumber('A', 'Temperature', '', '', '°', 1, 1, '', '', [iconButton, fabButton, miniFab]),
    new WidgetImage('Test', '/assets/images/ARD-HD.png'),
    graphWidget,
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    //new WidgetNumber(2, 'A', 'AA', 'AAA', '', '', 1, 2),
    //new WidgetNumber(3, 'A', 'AA', 'AAAAAA', '', '', 1, 2)
  ],
  [
    //new WidgetImage(4, 'MyImage', 'Logo', '', 2, 2, '')
  ]
];
