import { Injectable } from '@angular/core';
import {SocketMessage, WebsocketService} from './websocket.service';
import { MockWebsocketService } from './mock-websocket.service';
import { filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class TopicDataService {

  socketSubject$: Subject<any>;

  constructor(private wsService: WebsocketService, private mockService: MockWebsocketService) {
    // use socket service
    this.socketSubject$ = <Subject<any>>this.wsService
      .getSubject()
      .map((response: any): any => {
        return response;
      });
  }

  getData(topic: string): Observable<any> {
    //noinspection TypeScriptUnresolvedFunction
    return <Observable<any>>this.socketSubject$
      .filter(datum => datum.topic === topic)
      .map(datum => datum.data);
  }

  sendData(data: SocketMessage) {
    this.socketSubject$.next(data);
  }
}
