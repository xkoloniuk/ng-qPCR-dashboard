import {qPCRFile} from "../../interfaces/interface";

export class AddQPCRFile {
  static readonly type = '[Global State] Add file';
  constructor(public file: qPCRFile) {}
}

export class DeleteQPCRFile {
  static readonly type = '[Global State] Delete file';
  constructor(public fileName: string) {}
}

export class DeleteQPCRFiles {
  static readonly type = '[Global State] Delete files';
  constructor(public fileNames: string[]) {}
}

export class ResetState {
  static readonly type = '[Global State] Reset State';
}

// import {createAction, props} from "@ngrx/store";
// import {qPCRFile} from "../../interfaces/interface";
//
// export const addFile = createAction('[File] Add File', props<{ file: qPCRFile }>());
// // export const removeFile = createAction('[File] Remove File', props<{ index: number }>());
// export const resetStore = createAction('[Store] Reset');
