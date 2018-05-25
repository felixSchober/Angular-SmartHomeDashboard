import { Widget, WidgetImage, WidgetNumber, WidgetText, WidgetClock } from './widget';
import {ActionButtonType, WidgetAction} from './widgetAction';
import {WidgetGraph, WidgetGraphType, Margins, WidgetLineGraphParameters} from './widgetGraph';

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

// GRAPHS
const slimGraphMargins = new Margins(4, 0, 0, 0);

const multiSeries = [{
  name: 'series1',
  labels: ['1', '2', '3', '4'],
  values: [900, 980, 999, 891]
}, {
  name: 'series2',
  labels: ['1', '2', '3', '4'],
  values: [699, 811, 913, 139]
}];

const singleSeries = [{
  name: 'series1',
  labels: ['1', '2', '3', '4'],
  values: [1, 2, 2, 1]
}];

const singleSeriesColorFunction = function (d: any): string {
  return '#FFF';
};

const singleSeriesGraphParameters = new WidgetLineGraphParameters(singleSeriesColorFunction);

const graphWidgetSlim = new WidgetGraph('TestGraph', 'Test Title', WidgetGraphType.line, singleSeriesGraphParameters, slimGraphMargins, '', '', 'W', 1, 1, null, null, false, []);
graphWidgetSlim.values = singleSeries;

const graphWidgetWide = new WidgetGraph('TestGraph', 'Test Title', WidgetGraphType.line, null, null, '', '', 'W', 2, 1, null, '#FFF', false, []);

export const WIDGETS: Widget[][] = [
  [
    clockWidget,
    new WidgetNumber('TestTemperatureWidget1', 'Temperature', 'Test', '', '°', 2, 1, '#FFF', '#4CAF50', [basicButton, raisedButton], false),
    new WidgetNumber('TestTemperatureWidget2', 'Temperature', '', '', '°', 1, 1, '', '', [iconButton, fabButton, miniFab]),
    new WidgetImage('Test', '/assets/images/ARD-HD.png'),
    graphWidgetSlim,
    graphWidgetWide,
    new WidgetNumber('TestTemperatureWidget1', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°', 1, 1, null, null, [], true),
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
