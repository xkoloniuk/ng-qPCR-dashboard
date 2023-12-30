// app.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {qPCRFile} from "../../views/shell/shell.component";
import {AppState} from "./app.reducers";


// Create a feature selector for the 'app' state slice
export const selectAppState = createFeatureSelector<AppState>('app');

// Create a selector to get the entire global state

// Create a selector to get the array of data from the 'app' state
export const selectFiles = createSelector(
  selectAppState,
  (state: AppState) => state.files
);
export const selectFilesByTarget = (target: string) => createSelector(
  selectFiles,
  (allFiles) => {
    return allFiles.filter((file) => {
     return file.data.some((wellData) => wellData[2] === target)
    })
  }
);



// // Create a selector to get a specific file based on its ID
// export const selectFileById = (fileId: number) => createSelector(
//   selectFiles,
//   (files: MyInterface[]) => files.find(file => file.id === fileId)
// );

