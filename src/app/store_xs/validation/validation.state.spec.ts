import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ValidationState, ValidationStateModel } from './validation.state';

describe('Validation state', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ValidationState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an empty state', () => {
    const actual = store.selectSnapshot(ValidationState.getState);
    const expected: ValidationStateModel = {
      validTmPairs: [],
    };
    expect(actual).toEqual(expected);
  });
});
