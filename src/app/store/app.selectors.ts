// app.selectors.ts
import {createFeatureSelector, createSelector, MemoizedProjection, MemoizedSelector} from '@ngrx/store';
import {AppState} from "./app.reducers";
import {qPCRrecord} from "../../interfaces/interface";


export const selectAppState = createFeatureSelector<AppState>('app');

export const selectFiles = createSelector(
  selectAppState,
  (state: AppState) => state.files
);
export const selectFilesByTarget = (target: string) => createSelector(
  selectFiles,
  (allFiles) => allFiles.filter((file) => {
    return file.data.some((wellData: qPCRrecord) => wellData.Target === target)
  })
);
export const selectFilesBySample = (sample: string) => createSelector(
  selectFiles,
  (allFiles) => allFiles.filter((file) => {
    return file.data.some((wellData: qPCRrecord) => wellData.Sample === sample)
  })
);
export const selectFileByFileName = (fileName: string) => createSelector(
  selectFiles,
  (allFiles) => allFiles.find((file) => file.fileInfo["File Name"] === fileName)
);

export const selectSamplesNames = () => createSelector(
  selectFiles,
  (allFiles) => {
    allFiles.map(file => file.counts.uniqueSamples)
  });
