// app.actions.ts
import {createAction, props, Store} from '@ngrx/store';
import {qPCRFile} from "../../views/shell/shell.component";

// Example action
// export const someAction = createAction('[App] Some Action', props<{ payload: any }>());
// export const addFile = createAction(
//   '[App] Add qpcr plate csv file',
//   (store: Store, file: qPCRFile) =>
// );


export const addFile = createAction('[File] Add File', props<{ file: qPCRFile }>());
// export const removeFile = createAction('[File] Remove File', props<{ index: number }>());
