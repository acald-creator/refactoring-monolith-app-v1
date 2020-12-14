import { TestBed } from '@angular/core/testing';

import { Feed.ProviderService } from './feed.provider.service';

describe('Feed.ProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Feed.ProviderService = TestBed.get(Feed.ProviderService);
    expect(service).toBeTruthy();
  });
});
