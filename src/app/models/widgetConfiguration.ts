import { Widget, WidgetImage, WidgetNumber, WidgetText, WidgetClock } from './widget';
import {ActionButtonType, WidgetAction} from './widgetAction';
import {WidgetGraphLine, Margins, WidgetLineGraphParameters} from './widgetGraph';

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
  labels: ['1', '2', '3', '4', '5', '5', '5', '5', '5', '5', '5', '5', '5'],
  values: [1, 2, 2.5, 1, 1, 2.5, 3, 2, 2.1, 2, 1.88, 1, 3]
}, {
  name: 'series2',
  labels: ['1', '2', '3', '4', '5', '5', '5', '5', '5', '5', '5', '5', '5'],
  values: [1, 3, 2.1, 2, 2.5, 3, 3.1, 3.9, 2, 2, 1.9, 2.6, 1.9]
}];

const singleSeries = [{
  name: 'series1',
  labels: ['0', '1', '2', '3', '4', '0', '1', '2', '3', '4', '0', '1', '2', '3', '4', '1'],
  values: [5, 1, 2, 2, 1, 1, 2, 4, 4, 2, 2, 1, 13, 4, 2, 9]
}];


const singleSeriesColorFunction = function (d: any): string {
  return '#FFF';
};

const singleSeriesGraphParameters = new WidgetLineGraphParameters(null, singleSeriesColorFunction);

const graphWidgetSlim = new WidgetGraphLine('TestGraph',
  'Test Title',
  singleSeriesGraphParameters,
  slimGraphMargins, '', '', 'W', 1, 1, null, null, false, []);

setTimeout(() => {
  graphWidgetSlim.update(graphWidgetSlim, singleSeries);
  graphWidgetWide.update(graphWidgetWide, multiSeries);
}, 800);

setInterval(() => {
  let v = singleSeries[0].values.shift(); // remove the first element of the array
  singleSeries[0].values.push(v); // add a new element to the array (we're just taking the number we just shift
  graphWidgetSlim.update(graphWidgetSlim, singleSeries);

  v = multiSeries[0].values.shift();
  multiSeries[0].values.push(v);
  v = multiSeries[1].values.shift();
  multiSeries[1].values.push(v);
  graphWidgetWide.update(graphWidgetWide, multiSeries);
}, 4000);

const graphWidgetWide = new WidgetGraphLine('TestGraph',
  'Test Title',
  null, null, '', '', 'W', 2, 1, null, '#FFF', false, []);


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
  ],
  [
    new WidgetNumber('A', 'Temperature', '', '', '°'),
  ]
];
