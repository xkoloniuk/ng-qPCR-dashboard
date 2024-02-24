import {Injectable} from "@angular/core";
import {Selector, State} from "@ngxs/store";
import {qPCRFile, qPCRrecord} from "../../interfaces/interface";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../store/app.reducers";

interface tMValidCriteria {
  targetName: string,
  minAcceptedTm: number,
  maxAcceptedTm: number
}

interface GlobalStateModel {
  qPCRfiles?: qPCRFile[],
  targets?: Set<string>,
  samples?: Set<string>,
  tMValidation?: tMValidCriteria[],
}

@State<GlobalStateModel>({
  name: 'global',
  defaults: {
    qPCRfiles: undefined,
    targets: undefined,
    samples: undefined,
    tMValidation: undefined,
  }
})
@Injectable()
export class GlobalState {

  @Selector()
  static selectTargetsNames(state: GlobalStateModel): Set<string> {
    return state?.targets ?? new Set();
  }

  @Selector()
  static selectSamplesNames(state: GlobalStateModel): Set<string> {
    return state?.samples ?? new Set();
  }

  @Selector()
  static selectFiles(state: GlobalStateModel): qPCRFile[] {
    return state?.qPCRfiles ?? [];
  }

  @Selector()
  static getTmValidations(state: GlobalStateModel): tMValidCriteria[] {
    return state?.tMValidation ?? [];
  }

  @Selector()
  static selectFileBySample(sample: string) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file => file.data.some(row => row.Sample === sample)))
    };
  }

@Selector()
  static selectFileBySamples(samples: string[]) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file => file.data.some(row =>  samples.some( sample => sample === row.Sample))))
    };
  }

  @Selector()
  static selectFileByFileName(fileName: string) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file => file.fileInfo["File Name"] === fileName));
    };
  }

  @Selector()
  static selectFilesByTarget(target: string) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file => file.data.some((row: qPCRrecord) => row.Target === target))
      );
    };
  }

}


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
  (allFiles) => allFiles.flatMap(file => file.counts.uniqueSamples).flat());
