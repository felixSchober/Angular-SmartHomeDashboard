import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';


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

        // set timeout and wait for welcome message. If the welcome message was
        // not received after 5 seconds, close the socket.
        setTimeout(() => {
          if (!this.welcomeReceived) {
            console.error('Welcome message was not received after waiting for 5 seconds. Socket will be closed.');
            this.socket.disconnect();
            obs.complete();
          }
        }, 5000);


        // WELCOME MESSAGE RECEIVED
        this.socket.on('welcome', (data) => {
          this.welcomeReceived = true;
          console.log('Received welcome message from server.');
        });

        // NORMAL MESSAGE RECEIVED FROM SOCKET
        this.socket.on('message', (data) => {

          // we've received a message from the socket.
          // check if message contains topic
          if (data && data.topic && data.data !== null) {
            obs.next(data);
          } else {
            // data did not contain topic information.
            console.error('Received socket message but data could not be parsed or does not contain topic information.');
            console.log(data);
            obs.error('data could not be parsed or does not contain topic information.');
          }
        });

        // LOG MESSAGES RECEIVED FROM NODE SERVER
        this.socket.on('log', (message) => {
          console.log('[NODE] ' + message);
        });

        return () => {
          this.socket.disconnect();
          obs.complete();
        };
      });

      // This observer can be used so that the components are able to send messages
      // over the web socket using the `next()` method.
      const observer = {
        next: (data: Object) => {
          if (this.socket && this.socket.connected) {
            this.socket.emit('message', JSON.stringify(data));
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
}
