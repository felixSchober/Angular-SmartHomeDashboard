import { TestBed, inject } from '@angular/core/testing';

import { TabNavigationService } from './tab-navigation.service';

describe('TabNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabNavigationService]
    });
  });

  it('should be created', inject([TabNavigationService], (service: TabNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
