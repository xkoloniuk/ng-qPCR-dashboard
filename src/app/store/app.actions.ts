// app.actions.ts
import {createAction, props, Store} from '@ngrx/store';
import {qPCRFile} from "../../views/shell/shell.component";

export const addFile = createAction('[File] Add File', props<{ file: qPCRFile }>());
// export const removeFile = createAction('[File] Remove File', props<{ index: number }>());
export const resetStore = createAction('[Store] Reset');
