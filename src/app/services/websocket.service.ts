import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/observable';
import { Observer } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})

/* This class emits a RxJS subject.
    Components can `subscribe` to this subject as observers
    and will be notified if any messages are received.

    Components can also call `next()` on the observable part of the subject. This
    will send a message on the socket to the node server.
 */
export class WebsocketService {

  private socket;
  private subject: Rx.Subject<MessageEvent>;
  private welcomeReceived: boolean;

  constructor() {
    this.welcomeReceived = false;
  }

  getSubject(): Rx.Subject<MessageEvent> {

    // if the socket is not connected, connect first
    if (!this.socket || !this.socket.connected) {
      // connect to the socket
      this.socket = io(environment.webSocketUrl);

      // The observable will observe any new messages from the server
      // and will redirect them to the observers that subscribe to this observable.
      // obs is the observer that is the parameter for this anonymous function
      const observable = new Observable(obs => {

        // WELCOME MESSAGE RECEIVED
        this.socket.on('welcome', this.onWelcomeReceivedHandler);

        // NORMAL MESSAGE RECEIVED FROM SOCKET
        const messageHandler = this.getOnMessageHandler(obs);
        this.socket.on('message', messageHandler);

        // LOG MESSAGES RECEIVED FROM NODE SERVER
        this.socket.on('log', this.onLogMessageHandler);

        return () => {
          this.socket.disconnect();
          obs.complete();
        };
      });

      // This observer can be used so that the components are able to send messages
      // over the web socket using the `next()` method.
      const observer = {
        next: (message: SocketMessage) => {
          if (this.socket && this.socket.connected) {
            this.socket.emit(message.topic, message.data);
          } else {
            console.error('The socket is not connected. Please connect first.');
          }
        },
      };

      // we return our Rx.Subject which is a combination
      // of both an observer and observable.
      this.subject = Rx.Subject.create(observer, observable);
    }

    return this.subject;
  }

  private onWelcomeReceivedHandler(data: any): void {
    this.welcomeReceived = true;
    console.log('Received welcome message from server.');
  }

  private onLogMessageHandler(message: any): void {
    const logMessage = message as LogMessage;
    if (!logMessage) {
      return;
    }

    const logString = '[NODE] ' + moment(message.time).format() + ' - ' + message.message;
    if (message.isError) {
      console.error(logString);
    } else {
      console.log(logString);
    }
  }

  private getOnMessageHandler(obs: Observer<any>): (message: any) => void {
    return function (message: any): void {
      const socketMessage = message as SocketMessage;

      if (socketMessage === null) {
        console.error('Could not parse socket message: ', message);
        obs.error('Could not parse socket message');
        return;
      }

      // we've received a message from the socket
      // check if message contains topic
      if (socketMessage.topic && socketMessage.data !== null) {
        obs.next(socketMessage);
      } else {
        // data did not contain topic information
        console.error('Received socket message but data could not be parsed or does not contain topic information.');
        console.log(message);
        obs.error('data could not be parsed or does not contain topic information.');
      }
    };
  }
}

export class SocketMessage {
  topic: string;
  data: any;

  constructor(topic: string, data: any) {
    this.topic = topic;
    this.data = data;
  }
}

class LogMessage {
  time: string;
  message: string;
  isError: boolean;


  constructor(time: string, message: string, isError: boolean) {
    this.time = time;
    this.message = message;
    this.isError = isError;
  }
}
