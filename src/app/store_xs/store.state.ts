import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { qPCRFile } from '../../interfaces/interface';
import {
  AddQPCRFile,
  DeleteQPCRFile,
  DeleteQPCRFiles,
  ResetState,
} from './store.actions';

interface tMValidCriteria {
  targetName: string;
  minAcceptedTm: number;
  maxAcceptedTm: number;
}

interface GlobalStateModel {
  qPCRfiles: qPCRFile[];
  targets: Array<string>;
  samples: Array<string>;
  tMValidation?: tMValidCriteria[];
}

@State<GlobalStateModel>({
  name: 'global',
  defaults: {
    qPCRfiles: [] as qPCRFile[],
    targets: [],
    samples: [],
    tMValidation: undefined,
  },
})
@Injectable()
export class GlobalState {
  @Selector()
  static selectTargetsNames(state: GlobalStateModel): string[] {
    if (!state.targets) {
      return [];
    }
    return Array.from(state.targets);
  }

  @Selector()
  static selectSamplesNames(state: GlobalStateModel): string[] {
    if (!state.samples) {
      return [];
    }
    return Array.from(state.samples);
  }

  @Selector()
  static selectFiles(state: GlobalStateModel): qPCRFile[] {
    return state?.qPCRfiles ?? [];
  }

  @Selector()
  static getTmValidations(state: {
    global: GlobalStateModel;
  }): tMValidCriteria[] {
    return state?.global.tMValidation ?? [];
  }

  @Selector()
  static selectFilesBySample(sample: string) {
    return (state: { global: GlobalStateModel }) => {
      if (!state.global.qPCRfiles) {
        return [];
      }
      return state.global.qPCRfiles.filter((file) =>
        file.counts.uniqueSamples.some(
          (uniqueSample) => uniqueSample === sample,
        ),
      );
    };
  }

  @Selector()
  static selectFilesBySamples(samplesQuery: string[]) {
    return (state: { global: GlobalStateModel }) => {
      if (!state.global.qPCRfiles) {
        return [];
      }
      return state.global.qPCRfiles.filter((file) =>
        file.counts.uniqueSamples.some((uniqueSample) =>
          samplesQuery.some((sample) => sample === uniqueSample),
        ),
      );
    };
  }

  @Selector()
  static selectFileByFileName(fileName: string) {
    return (state: { global: GlobalStateModel }) => {
      if (!state.global.qPCRfiles) {
        return undefined;
      }
      return state.global.qPCRfiles.find(
        (file) => file.fileInfo.fileName === fileName,
      );
    };
  }

  @Selector()
  static selectFilesByTarget(target: string) {
    return (state: { global: GlobalStateModel }): qPCRFile[] => {
      if (!state.global.qPCRfiles) {
        return [];
      }
      const filteredFiles = state.global.qPCRfiles.filter((file) => {
        if (!file.counts.uniqueTargets) {
          return false;
        }

        const hasMatchingTarget = file.counts.uniqueTargets.some(
          (uniqueTarget) => {
            return uniqueTarget === target;
          },
        );

        return hasMatchingTarget;
      });

      return filteredFiles;
    };
  }

  @Selector()
  static selectFilesByTargets(enqueriedTargets: string[]) {
    return (state: GlobalStateModel) => {
      if (!state.qPCRfiles) {
        return [];
      }
      return state.qPCRfiles.filter((file) =>
        file.counts.uniqueSamples.some((uniqueTarget) =>
          enqueriedTargets.some(
            (enqueriedTarget) => enqueriedTarget === uniqueTarget,
          ),
        ),
      );
    };
  }

  @Action(AddQPCRFile)
  addQPCRFile(ctx: StateContext<GlobalStateModel>, action: AddQPCRFile) {
    const state = ctx.getState();
    const qPCRFiles = state.qPCRfiles ? [...state.qPCRfiles] : [];

    const targets = state.targets
      ? new Set([...state.targets])
      : new Set<string>();
    action.file.counts.uniqueTargets.forEach((newTarget) => {
      if (newTarget === null || !newTarget) return;
      targets.add(newTarget);
    });

    const samples = state.samples
      ? new Set([...state.samples])
      : new Set<string>();
    action.file.counts.uniqueSamples.forEach((newSample) => {
      if (newSample === null || !newSample) return;
      samples.add(newSample);
    });

    qPCRFiles.push(action.file);

    ctx.patchState({
      qPCRfiles: qPCRFiles,
      targets: Array.from(targets),
      samples: Array.from(samples),
    });
  }

  @Action(DeleteQPCRFile)
  deleteQPCRFile(ctx: StateContext<GlobalStateModel>, action: DeleteQPCRFile) {
    const state = ctx.getState();
    const qPCRFiles = state.qPCRfiles ? [...state.qPCRfiles] : [];

    ctx.patchState({
      qPCRfiles: qPCRFiles.filter(
        (file) => file.fileInfo.fileName !== action.fileName,
      ),
    });
  }

  @Action(DeleteQPCRFiles)
  deleteQPCRFiles(
    ctx: StateContext<GlobalStateModel>,
    action: DeleteQPCRFiles,
  ) {
    const state = ctx.getState();
    const qPCRFiles = state.qPCRfiles ? [...state.qPCRfiles] : [];

    ctx.patchState({
      qPCRfiles: qPCRFiles.filter(
        (file) => !action.fileNames.includes(file.fileInfo.fileName),
      ),
    });
  }

  @Action(ResetState)
  resetState(ctx: StateContext<GlobalStateModel>) {
    ctx.setState({
      qPCRfiles: [],
      targets: [],
      samples: [],
      tMValidation: [],
    });
  }
}
