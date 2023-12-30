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

// // Create a selector to get a specific file based on its ID
// export const selectFileById = (fileId: number) => createSelector(
//   selectFiles,
//   (files: MyInterface[]) => files.find(file => file.id === fileId)
// );
