import {ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadEvent, FileUploadModule} from 'primeng/fileupload';
import {readConfiguration} from "@angular/compiler-cli";
import {TargetCardComponent} from "../../components/target-card/target-card.component";
import {Store} from "@ngrx/store";
import {addFile, resetStore} from "../../app/store/app.actions";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {selectFiles} from "../../app/store/app.selectors";
import {tap} from "rxjs";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'ng-q-dashboard-shell',
  standalone: true,
  imports: [CommonModule, FileUploadModule, TargetCardComponent, RouterLink, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {

  #store = inject(Store);

  public selectedFiles: WritableSignal<Array<NamedFile>> = signal([]);
  public qpcrFiles: WritableSignal<Array<qPCRFile>> = signal([]);
  private showProgressBar?: boolean;

  public targets: Signal<string[]> = computed(() => {
    let targets: Array<string> = []
    this.qpcrFiles().forEach(f => targets.push(...f.counts.uniqueTargets))
    return Array.from(new Set(targets))
  });

  public samples: Signal<string[]> = computed(() => {
    let targets: Array<string> = []
    this.qpcrFiles().forEach(f => targets.push(...f.counts.uniqueSamples))
    return Array.from(new Set(targets))
  });


  // qPCRfile: qPCdata = {
  //   data: [],
  //   targets: [],
  //   sampleTypes: [],
  //   headers: [],
  // };

  // #fileReader = inject(FileToTextReaderService);

  // onBasicUploadAuto($event: FileUploadEvent) {
  //   console.log('onBasicUploadAuto CALLED')
  //   // for (const file of $event.files) {
  //   //   const add: NamedFile = {key: file.name, file: file};
  //   //   this.selectedFiles.update(val => {
  //   //     val.push(add)
  //   //     return val
  //   //   });
  //   // }
  // }

  async customHandler(files: File[]) {
    this.showProgressBar = true;
    console.log('customHandler CALLED')

    this.#store.dispatch(resetStore())
    this.qpcrFiles.set([])

    files.forEach((file: File) => {
      this.processCsvFile(file);
    });
  }

  processCsvFile(file: File) {
    // console.log('processCsvFile CALLED')

    file.text().then((csv) => {
      // console.log(csv)

      const csvLines = csv.split('\n')

      let fileInfo: qPCRFileInfo = {
        'File Name': '',
        'Created By User': '',
        'Notes': '',
        'ID': '',
        'Run Started': '',
        'Run Ended': '',
        'Sample Vol': '',
        'Lid Temp': '',
        'Protocol File Name': '',
        'Plate Setup File Name': '',
        'Base Serial Number': '',
        'Optical Head Serial Number': '',
        'CFX Maestro Version': '',
        'Well group': '',
        'Amplification step': '',
        'Melt step': ''
      };

      let columns: string[] = []
      let data: Array<qPCRrecord> = []

      csvLines.forEach((csvLine, index) => {
        // split line from CSV file into array
        const csValuesArr = csvLine.split(',')
        // check for null
        if (!csValuesArr[0]) {
          return
        }

        const fileInfoKeys = [
          'File Name',
          'Created By User',
          'Notes',
          'ID',
          'Run Started',
          'Run Ended',
          'Sample Vol',
          'Lid Temp',
          'Protocol File Name',
          'Plate Setup File Name',
          'Base Serial Number',
          'Optical Head Serial Number',
          'CFX Maestro Version',
          'Well group',
          'Amplification step',
          'Melt step'
        ]

        // if the first value represents one of info keys, then process it properly
        if (csValuesArr[0] && fileInfoKeys.includes(csValuesArr[0])) {

          // convert value for date key into Date format
          if (csValuesArr[0] === 'Run Started' || csValuesArr[0] === 'Run Ended') {
            const dateValue = new Date(Date.parse(csValuesArr[1]))
            // @ts-ignore
            fileInfo[csValuesArr[0]] = dateValue
            return
          }
          //  remaining assign as they are
          // @ts-ignore
          fileInfo[csValuesArr[0]] = csValuesArr[1]
          return
        }

        // catch line that represents columns to get actual column names
        if (csValuesArr[0] && csValuesArr[0] === 'Well') {
          columns = csValuesArr
          return
        }


        // remaining lines should be well data, one well per a line


        // Transform data and names into an array of objects

        let obj: qPCRrecord = {
          Well: '',
          Fluor: '',
          Target: '',
          Content: '',
          Replicate: '',
          Sample: '',
          'Biological Set Name': '',
          'Well Note': '',
          Cq: '',
          'Starting Quantity (SQ)': '',
          'Cq Mean': '',
          'Cq Std. Dev': '',
          'SQ Std. Dev': '',
          'Melt Temperature': '',
          'Peak Height': '',
          'Begin Temperature': '',
          'End Temperature': '',
          Call: '',
          'End RFU': '',
        }


        csValuesArr.forEach((value, index) => {
          const key = columns[index];
          // @ts-ignore
          obj[key] = value
        });

        data.push(obj)
      })


      const counts = this.generateReport({columns, data})

      const add: qPCRFile = {fileInfo, counts, columns, data} as qPCRFile

      this.#store.dispatch(addFile({file: add}))

      this.qpcrFiles.update(val => {
        val.push(add)
        return val
      })
    });
  }


  generateReport(inputData: Partial<qPCRFile>) {
    console.log(inputData.columns)
    console.log(inputData.data)

    const samples = inputData?.data?.map(wellData => wellData.Sample);
    const targets = inputData?.data?.map(wellData => wellData.Target);

    const uniqueSamples = Array.from(new Set(samples))
    const uniqueTargets = Array.from(new Set(targets))

    return {uniqueSamples, uniqueTargets}
  }
}


// interface qPcrRun {
//   fileInfo: qPcrFileInfo,
//   data: qPCRrecord[]
// }

// type qPcrFileInfo = {
// [key in typeof qPCRFileInfoKeys[number]]: string
// }

interface customqPCRCounts {
  uniqueSamples: string[];
  uniqueTargets: string[]
}

export interface qPCRFile {
  fileInfo: qPCRFileInfo;
  columns: Array<string>;
  counts: customqPCRCounts;
  data: Array<qPCRrecord>
}


export interface qPCRFileInfo {
  'File Name': string;
  'Created By User': string;
  'Notes': string;
  'ID': string;
  'Run Started': string;
  'Run Ended': string;
  'Sample Vol': string;
  'Lid Temp': string;
  'Protocol File Name': string;
  'Plate Setup File Name': string;
  'Base Serial Number': string;
  'Optical Head Serial Number': string;
  'CFX Maestro Version': string;
  'Well group': string;
  'Amplification step': string;
  'Melt step': string
}


interface NamedFile {
  key: string;
  file: File
}

export interface qPCRrecord {
  Well: string;
  Fluor: string;
  Target: string;
  Content: string;
  Replicate?: string;
  Sample: string;
  'Biological Set Name'?: string;
  'Well Note'?: string;
  Cq: string;
  'Starting Quantity (SQ)'?: string;
  'Cq Mean'?: string;
  'Cq Std. Dev'?: string;
  'SQ Std. Dev'?: string;
  'Melt Temperature'?: string;
  'Peak Height'?: string;
  'Begin Temperature'?: string;
  'End Temperature'?: string;
  Call?: string;
  'End RFU'?: string;
}
