import { TestBed, inject } from '@angular/core/testing';

import { MockWebsocketService } from './mock-websocket.service';

describe('MockWebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockWebsocketService]
    });
  });

  it('should be created', inject([MockWebsocketService], (service: MockWebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
