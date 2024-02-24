import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {qPCRFile} from "../../interfaces/interface";
import {AddQPCRFile, DeleteQPCRFile, DeleteQPCRFiles, ResetState} from "./store.actions";

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
  static selectFilesBySample(sample: string) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file => file.counts.uniqueSamples.some(uniqueSample => uniqueSample === sample)))
    };
  }

@Selector()
  static selectFilesBySamples(enqueriedSamples: string[]) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file => file.counts.uniqueSamples.some(uniqueSample =>  enqueriedSamples.some( enqueriedSample => enqueriedSample === uniqueSample))))
    };
  }

  @Selector()
  static selectFileByFileName(fileName: string) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return undefined;
      }
      return state.qPCRfiles.find((file => file.fileInfo["File Name"] === fileName));
    };
  }

  @Selector()
  static selectFilesByTarget(target: string) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file => file.counts.uniqueTargets.some(uniqueTarget => uniqueTarget === target))
      );
    };
  }

  @Selector()
  static selectFilesByTargets(enqueriedTargets: string[]) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file => file.counts.uniqueSamples.some(uniqueTarget =>  enqueriedTargets.some( enqueriedTarget => enqueriedTarget === uniqueTarget))))
    };
  }

  @Action(AddQPCRFile)
  addQPCRFile(ctx: StateContext<GlobalStateModel>, action: AddQPCRFile) {
    const state = ctx.getState();
    const qPCRFiles = state.qPCRfiles ? [...state.qPCRfiles] : [];

    qPCRFiles.push(action.file);

    ctx.patchState({
      qPCRfiles: qPCRFiles
    });
  }


  @Action(DeleteQPCRFile)
  deleteQPCRFile(ctx: StateContext<GlobalStateModel>, action: DeleteQPCRFile) {
    const state = ctx.getState();
    const qPCRFiles = state.qPCRfiles ? [...state.qPCRfiles] : [];
    qPCRFiles.filter(file => file.fileInfo["File Name"] !== action.fileName);

    ctx.patchState({
      qPCRfiles: qPCRFiles
    });
  }

  @Action(DeleteQPCRFiles)
  deleteQPCRFiles(ctx: StateContext<GlobalStateModel>, action: DeleteQPCRFiles) {
    const state = ctx.getState();
    const qPCRFiles = state.qPCRfiles ? [...state.qPCRfiles] : [];
    action.fileNames.some(fileToDelete => qPCRFiles.filter(file => fileToDelete !== file.fileInfo["File Name"]));

    ctx.patchState({
      qPCRfiles: qPCRFiles
    });
  }

  @Action(ResetState)
  resetState(ctx: StateContext<GlobalStateModel>) {
    ctx.setState({
      qPCRfiles: [],
      targets: new Set<string>(),
      samples: new Set<string>(),
      tMValidation: []
    });
  }



}
