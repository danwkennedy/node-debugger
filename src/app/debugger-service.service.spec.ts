/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DebuggerService } from './debugger-service.service';

describe('Service: DebuggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebuggerServiceService]
    });
  });

  it('should ...', inject([DebuggerServiceService], (service: DebuggerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
