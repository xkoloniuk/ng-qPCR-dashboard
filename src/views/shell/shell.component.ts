import {ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadEvent, FileUploadModule} from 'primeng/fileupload';
import {readConfiguration} from "@angular/compiler-cli";
import {TargetCardComponent} from "../../components/target-card/target-card.component";
import {Store} from "@ngrx/store";
import {addFile} from "../../app/store/app.actions";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {selectFiles} from "../../app/store/app.selectors";
import {tap} from "rxjs";

@Component({
  selector: 'ng-q-dashboard-shell',
  standalone: true,
  imports: [CommonModule, FileUploadModule, TargetCardComponent],
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
    this.qpcrFiles().forEach(f => targets.push(...this.getUniques('Target', f)))
    return Array.from(new Set(targets))
  });

  public samples: Signal<string[]> = computed(() => {
    let targets: Array<string> = []
    this.qpcrFiles().forEach(f => targets.push(...this.getUniques('Sample', f)))
    return Array.from(new Set(targets))
  });


  // qPCRfile: qPCdata = {
  //   data: [],
  //   targets: [],
  //   sampleTypes: [],
  //   headers: [],
  // };

  // #fileReader = inject(FileToTextReaderService);

  getUniques(string: string, file: qPCRFile) {
    const index = file.columns.indexOf(string)
    return Array.from(new Set(file.data.map(d => d[index])))
  }

  onBasicUploadAuto($event: FileUploadEvent) {
    // console.log('onBasicUploadAuto CALLED')
    for (const file of $event.files) {
      const add: NamedFile = {key: file.name, file: file};
      this.selectedFiles.update(val => {
        val.push(add)
        return val
      });
    }
  }

  async customHandler(files: File[]) {
    this.showProgressBar = true;
    // console.log('customHandler CALLED')

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
      let data: Array<Array<string>> = []

      csvLines.forEach((csvLine, index) => {

        const csValuesArr = csvLine.split(',')

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


        if (csValuesArr[0] && fileInfoKeys.includes(csValuesArr[0])) {
          // console.log(csValuesArr[0])

          // @ts-ignore
          fileInfo[csValuesArr[0]] = csValuesArr[1]
          return
        }

        // get actual column names
        if (csValuesArr[0] && csValuesArr[0] === 'Well') {
          columns = csValuesArr
          return
        }

        data.push(csValuesArr)


      })

      const add: qPCRFile = {fileInfo, columns, data}

      this.#store.dispatch(addFile({file: add}))

      this.#store.select(selectFiles).subscribe(d=> console.log(d[0]))



      this.qpcrFiles.update(val => {
        val.push(add)


        return val
      })


    });


    // description header
    //
    // arrayOrRows
    //   .filter((_, i) => i < 19)
    //   .forEach((i) => {
    //     const row = i.split(',');
    //     this.qPCRfile[row[0]] = row[1];
    //   });
    //
    // for (let i = 20; i < arrayOrRows.length; i++) {
    //   const obj: { [key: string]: unknown } = {};
    //   arrayOrRows[i].split(',').forEach((cell, index) => {
    //     if (cell[index] === undefined) obj[headers[index]] = '';
    //     obj[headers[index]] = cell;
    //   });
    //   this.qPCRfile.data.push(obj);
    // }
    //
    // console.log(this.qPCRfile.data);
    //
    // const setOfTargets = new Set(
    //   this.qPCRfile.data.map((i) => i?.Target ?? false)
    // );
    // const setOfSampleTypes = new Set(
    //   this.qPCRfile.data.map((i) => i?.Content ?? false)
    // );
    //
    // this.qPCRfile.targets = Array.from(setOfTargets).sort();
    // this.qPCRfile.sampleTypes = Array.from(setOfSampleTypes).sort();
  }

//   extractHeaderInfo (txt: string): any{} => {
//     const csvLine = txt.split(',');
//     return {csvLine[0] : csvLine[1]}
// }

}


// interface qPcrRun {
//   fileInfo: qPcrFileInfo,
//   data: qPCRrecord[]
// }

// type qPcrFileInfo = {
// [key in typeof qPCRFileInfoKeys[number]]: string
// }

export interface qPCRFile {
  fileInfo: qPCRFileInfo;
  columns: Array<string>;
  data: Array<Array<string>>
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

interface qPCRrecord {
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
