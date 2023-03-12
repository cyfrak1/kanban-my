import { TestBed } from '@angular/core/testing';

import { CloseDialogService } from './close-dialog.service';

describe('CloseDialogService', () => {
  let service: CloseDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
