import { ValidationMeltTempPair } from './validation.state';

export class LoadValidationData {
  static readonly type = '[Validation] Load Data';
}

export class SaveValidationData {
  static readonly type = '[Validation] Save Data';
  constructor(public payload: ValidationMeltTempPair[]) {}
}

export class AddValidationPair {
  static readonly type = '[Validation] Add Pair';
  constructor(public payload: ValidationMeltTempPair) {}
}

export class RemoveValidationPair {
  static readonly type = '[Validation] Remove Pair';
  constructor(public target: string) {}
}

export class UpdateValidationPair {
  static readonly type = '[Validation] Update Pair';
  constructor(
    public target: string,
    public newValidTm: number,
  ) {}
}
