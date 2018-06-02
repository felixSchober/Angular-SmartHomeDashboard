import {ActionButtonType} from '../enums/ActionButtonType';
import {WidgetType} from '../enums/WidgetType';
import {IWidget} from '../Interfaces/IWidget';
import {GraphMargins} from './Graph/GraphMargins';
import {GraphParametersLine} from './Graph/GraphParametersLine';
import { WidgetAction} from './widgetAction';
import {WidgetClock} from './widgets/WidgetClock';
import {WidgetGraphLine} from './widgets/WidgetGraphLine';
import {WidgetImage} from './widgets/WidgetImage';
import {WidgetNumber} from './widgets/WidgetNumber';
import {WidgetStatus} from './widgets/WidgetStatus';
import {WidgetSwitch} from './widgets/WidgetSwitch';

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

const basicButton = new WidgetAction('Basic', ActionButtonType.Basic, null, null, null, incrementNumber);
const raisedButton = new WidgetAction('Raised', ActionButtonType.Raised, 1, 'TEST_TOPIC', {test: 1}, incrementNumber);
const iconButton = new WidgetAction('favorite', ActionButtonType.Icon, null, '', '', incrementNumber);
const fabButton = new WidgetAction('Fab', ActionButtonType.Fab, null, '', '', incrementNumber);
const miniFab = new WidgetAction('Mini fab', ActionButtonType.MiniFab, null, '', '', incrementNumber);
const primaryNavigation = new WidgetAction('', ActionButtonType.Primary, 1);

const clockWidget = new WidgetClock('TestClock', 2, 1, '#4CAF50');

// GRAPHS
const slimGraphMargins = new GraphMargins(4, 0, 0, 0);


const singleSeriesColorFunction = function (d: any): string {
  return '#FFF';
};

const singleSeriesGraphParameters = new GraphParametersLine(null, singleSeriesColorFunction);

const graphWidgetSlim = new WidgetGraphLine('powerLevelHistory_Computer',
  'Computer',
  singleSeriesGraphParameters,
  slimGraphMargins, '', '', 'W', 1, 1, null, null, false, []);

const graphWidgetWide = new WidgetGraphLine('powerLevelHistory_Total',
  'Power History',
  null, null, '', '', 'W', 2, 1, null, '#FFF', false, []);

const lightStatusWidget = new WidgetStatus('LightStatus', 'Lights', WidgetType.Status);
const deskLightWidget = new WidgetSwitch('lightState_Schreibtisch', 'Schreibtisch', WidgetType.SwitchLight,
  'Schreibtisch', 1, 1, '#E91E63');

const channelImages = ['/assets/images/ARD-HD.png', '/assets/images/Kabel-1.png'];
const channelImageWidget = new WidgetImage('ChannelImage', channelImages[0]);
const statusWidget = new WidgetStatus('TVActivity', 'TV', WidgetType.StatusImage, channelImages);

const numberWidget1 = new WidgetNumber('TestTemperatureWidget1', 'Temperature wide', 'Test',
  '', '°', 2, 1, '#FFF', '#4CAF50', [primaryNavigation,
    basicButton, raisedButton], false);

const numberWidget2 = new WidgetNumber('TestTemperatureWidget2', 'Temperature small', '',
  '', '°', 1, 1, '', '', [iconButton, fabButton, miniFab]);

/*
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


let statusIndex = 0;
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

  // change channel image
  statusIndex = (statusIndex + 1) % 2;
  channelImageWidget.update(channelImageWidget, channelImages[statusIndex]);

  // change status
  lightStatusWidget.update(lightStatusWidget, statusIndex);
  statusWidget.update(statusWidget, statusIndex);

}, 4000);
*/

  export const WIDGETS: IWidget[][] = [
  [
    clockWidget,
    numberWidget1,
    numberWidget2,
    channelImageWidget,
    graphWidgetSlim,
    graphWidgetWide,
    lightStatusWidget,
    deskLightWidget,
    new WidgetNumber('A', 'Temperature', '', '', '°', 1, 1, null, null, [], true),
    statusWidget,
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
    new WidgetNumber('A', 'Temperature', '', '', '°'),
  ],
  [
    new WidgetNumber('A', 'Temperature', '', '', '°', null, null, null, null, [primaryNavigation]),
  ]
];
