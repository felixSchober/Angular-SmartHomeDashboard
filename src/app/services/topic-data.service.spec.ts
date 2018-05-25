import { TestBed, inject } from '@angular/core/testing';

import { TopicDataService } from './topic-data.service';

describe('TopicDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicDataService]
    });
  });

  it('should be created', inject([TopicDataService], (service: TopicDataService) => {
    expect(service).toBeTruthy();
  }));
});
