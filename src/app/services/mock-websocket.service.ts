import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import * as Rx from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class MockWebsocketService {

  private subject: Rx.Subject<MessageEvent>;
  topcis: string[];
  intervalSet: boolean;

  constructor() {
    this.topcis = [
      'TestTemperatureWidget1',
      'TestTemperatureWidget2',
      'A'
    ];
    this.intervalSet = false;
  }

  getSubject(): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      const observable = new Observable(obs => {
        console.log('Initialize observable ' + Math.random());
        if (!this.intervalSet) {
          this.intervalSet = true;
          // publish a new data point every 3 seconds
          setInterval(() => {
            for (let i = 0; i < this.topcis.length; i++) {
              const topicString = this.topcis[i];

              const datum = Math.random() * 100;
              const data = {
                topic: topicString,
                data: datum
              };
              console.log('Send interval data (Topic: ' + topicString + ' - Data: ' + datum + ')');
              obs.next(data);
            }
          }, 6000);
        }
      });

      // This observer can be used so that the components are able to send messages
      // over the web socket using the `next()` method.
      const observer = {
        next: (data: Object) => {
          console.log('[MOCK WEBSOCKET] Mock Send message ' + data);
        },
      };

      // we return our Rx.Subject which is a combination
      // of both an observer and observable.
      this.subject = Rx.Subject.create(observer, observable);
      return this.subject;
    } else {
      return this.subject;
    }
  }
}
