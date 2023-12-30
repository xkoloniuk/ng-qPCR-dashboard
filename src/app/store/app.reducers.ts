import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import {addFile} from "./app.actions";
import {qPCRFile} from "../../views/shell/shell.component";




// Define the initial state
export const initialState: AppState = {
  files: []
};


export const appReducers = createReducer(
  initialState,
  on(addFile, (state, { file }) => {
    return {
      ...state,
      files: [...state.files, file],
    };
  }),
  // on(removeFile, (state,{index  }) => {
  //   return {
  //     ...state,
  //     files: state.files.filter((file, name: string) => file.fileInfo.fileName !== name),
  //   };
  // })
);


export interface AppState {
  // Define your state properties here
  files: qPCRFile[];
}
