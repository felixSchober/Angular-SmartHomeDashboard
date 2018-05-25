import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabNavigationService {

  oberservers: any[];
  constructor() {
    this.oberservers = [];
  }

  addObserver(obs: any) {
    this.oberservers.push(obs);
  }

  changeTab(newTabIndex: number) {
    for (let i = 0; i < this.oberservers.length; i++) {
      const obs = this.oberservers[i];
      obs.next(newTabIndex);
    }
  }
}
