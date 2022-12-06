import { TestBed } from '@angular/core/testing';

import { PassDataToDialogService } from './pass-data-to-dialog.service';

describe('PassDataToDialogService', () => {
  let service: PassDataToDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataToDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
