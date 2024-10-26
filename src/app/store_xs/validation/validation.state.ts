import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddValidationPair,
  LoadValidationData,
  RemoveValidationPair,
  SaveValidationData,
  UpdateValidationPair,
} from './validation.actions';

export interface ValidationMeltTempPair {
  target: string;
  validTm: number;
}

export interface ValidationStateModel {
  validTmPairs: ValidationMeltTempPair[];
}

@State<ValidationStateModel>({
  name: 'validation',
  defaults: {
    validTmPairs: [],
  },
})
@Injectable()
export class ValidationState {
  private readonly storageKey = 'validationTmPairs';

  @Selector()
  static getState(state: ValidationStateModel) {
    return state;
  }

  @Selector()
  static getValidTmPairs(state: ValidationStateModel) {
    return state.validTmPairs;
  }

  @Action(LoadValidationData)
  loadData(ctx: StateContext<ValidationStateModel>) {
    const state = ctx.getState();
    try {
      const storedData = localStorage.getItem(this.storageKey);
      if (storedData) {
        const parsedData = JSON.parse(storedData) as ValidationMeltTempPair[];
        ctx.setState({
          ...state,
          validTmPairs: parsedData,
        });
      }
    } catch (error) {
      console.error('Error loading validation data from localStorage:', error);
    }
  }

  @Action(SaveValidationData)
  saveData(
    ctx: StateContext<ValidationStateModel>,
    action: SaveValidationData,
  ) {
    const state = ctx.getState();
    const updatedPairs = action.payload;

    ctx.setState({
      ...state,
      validTmPairs: updatedPairs,
    });

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(updatedPairs));
    } catch (error) {
      console.error('Error saving validation data to localStorage:', error);
    }
  }

  @Action(AddValidationPair)
  addPair(ctx: StateContext<ValidationStateModel>, action: AddValidationPair) {
    const state = ctx.getState();
    const updatedPairs = [...state.validTmPairs, action.payload];

    ctx.setState({
      validTmPairs: updatedPairs,
    });

    this.updateLocalStorage(ctx);
  }

  @Action(RemoveValidationPair)
  removePair(
    ctx: StateContext<ValidationStateModel>,
    action: RemoveValidationPair,
  ) {
    const state = ctx.getState();
    const updatedPairs = state.validTmPairs.filter(
      (pair) => pair.target !== action.target,
    );

    ctx.setState({
      validTmPairs: updatedPairs,
    });

    this.updateLocalStorage(ctx);
  }

  @Action(UpdateValidationPair)
  updatePair(
    ctx: StateContext<ValidationStateModel>,
    action: UpdateValidationPair,
  ) {
    const state = ctx.getState();
    const updatedPairs = state.validTmPairs.map((pair) =>
      pair.target === action.target
        ? { ...pair, validTm: action.newValidTm }
        : pair,
    );

    ctx.setState({
      validTmPairs: updatedPairs,
    });

    this.updateLocalStorage(ctx);
  }

  private updateLocalStorage(ctx: StateContext<ValidationStateModel>) {
    try {
      const state = ctx.getState();
      localStorage.setItem(this.storageKey, JSON.stringify(state.validTmPairs));
    } catch (error) {
      console.error('Error saving validation data to localStorage:', error);
    }
  }
}
