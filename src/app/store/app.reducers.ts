import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import {addFile, resetStore} from "./app.actions";
import {qPCRFile} from "../../interfaces/interface";




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
  on(resetStore, (state) => initialState )

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
