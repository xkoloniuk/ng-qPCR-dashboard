// app.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {qPCRFile} from "../../views/shell/shell.component";
import {AppState} from "./app.reducers";


export const selectAppState = createFeatureSelector<AppState>('app');

export const selectFiles = createSelector(
  selectAppState,
  (state: AppState) => state.files
);
export const selectFilesByTarget = (target: string) => createSelector(
  selectFiles,
  (allFiles) =>  allFiles.filter((file) => {
     return file.data.some((wellData) => wellData[2] === target)
    })
);

