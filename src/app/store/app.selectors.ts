// app.selectors.ts
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {qPCRFile} from "../../views/shell/shell.component";
import {AppState} from "./app.reducers";


export const selectAppState = createFeatureSelector<AppState>('app');

export const selectFiles = createSelector(
  selectAppState,
  (state: AppState) => state.files
);
export const selectFilesByTarget = (target: string) => createSelector(
  selectFiles,
  (allFiles) => allFiles.filter((file) => {
    const targetIndex = file.columns.indexOf('Target')
    return file.data.some((wellData) => wellData[targetIndex] === target)
  })
);
export const selectFileByFileName = (fileName: string) => createSelector(
  selectFiles,
  (allFiles) => allFiles.find((file) => file.fileInfo["File Name"] === fileName)
);
