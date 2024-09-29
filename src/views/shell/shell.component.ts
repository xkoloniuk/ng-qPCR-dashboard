import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { TargetCardComponent } from '../../components/target-card/target-card.component';

import { RouterLink, RouterOutlet } from '@angular/router';
import { qPCRFile, qPCRFileInfo, qPCRrecord } from '../../interfaces/interface';
import { Store } from '@ngxs/store';
import { AddQPCRFile, ResetState } from '../../app/store_xs/store.actions';
import { Observable } from 'rxjs';
import { GlobalState } from '../../app/store_xs/store.state';

@Component({
  selector: 'ng-q-dashboard-shell',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadModule,
    TargetCardComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit {
  #store = inject(Store);

  public selectedFiles: WritableSignal<Array<NamedFile>> = signal([]);
  public qpcrFiles$!: Observable<qPCRFile[]>;
  public samples$!: Observable<string[]>;
  public targets$!: Observable<string[]>;
  private showProgressBar?: boolean;

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

  public ngOnInit() {
    this.qpcrFiles$ = this.#store.select(GlobalState.selectFiles);
    this.samples$ = this.#store.select(GlobalState.selectSamplesNames);
    this.targets$ = this.#store.select(GlobalState.selectTargetsNames);
  }

  public customHandler(files: File[]) {
    this.showProgressBar = true;
    console.log('customHandler CALLED');

    this.#store.dispatch(new ResetState());

    files.forEach((file: File) => {
      this.processCsvFile(file);
    });
  }

  processCsvFile(file: File) {
    file.text().then((csv) => {
      const csvLines = csv.split('\n');

      let fileInfo = {} as qPCRFileInfo;
      let columns: string[] = [];
      let data: Array<qPCRrecord> = [];

      csvLines.forEach((csvLine, index) => {
        // split line from CSV file into array
        const csValuesArr = csvLine.split(',');
        // check for null
        if (!csValuesArr[0]) {
          return;
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
          'Melt step',
        ];

        // if the first value represents one of info keys, then process it accordingly
        if (csValuesArr[0] && fileInfoKeys.includes(csValuesArr[0])) {
          // convert value for date key into Date format
          if (
            csValuesArr[0] === 'Run Started' ||
            csValuesArr[0] === 'Run Ended'
          ) {
            const dateValue = new Date(Date.parse(csValuesArr[1]));
            // @ts-ignore
            fileInfo[csValuesArr[0]] = dateValue;
            return;
          }
          //  remaining are assigned as they are
          // @ts-ignore
          fileInfo[csValuesArr[0]] = csValuesArr[1];
          return;
        }

        // catch line that represents columns to get actual column names
        if (csValuesArr[0] && csValuesArr[0] === 'Well') {
          columns = csValuesArr;
          return;
        }

        // remaining lines should be well data, one well per a line

        // Transform data and names into an array of objects

        let obj = {} as qPCRrecord;

        csValuesArr.forEach((value, index) => {
          const key = columns[index];
          // @ts-ignore
          obj[key] = value;
        });

        data.push(obj);
      });

      const counts = this.generateReport({ columns, data });

      const fileToAdd: qPCRFile = {
        fileInfo,
        counts,
        columns,
        data,
      } as qPCRFile;

      this.#store.dispatch(new AddQPCRFile(fileToAdd));
    });
  }

  private generateReport(inputData: Partial<qPCRFile>) {
    console.log('generate report');
    const samples = inputData?.data?.map((wellData) => wellData.Sample);
    const targets = inputData?.data?.map((wellData) => wellData.Target);

    const uniqueSamples = Array.from(new Set(samples));
    const uniqueTargets = Array.from(new Set(targets));

    return { uniqueSamples, uniqueTargets };
  }
}

interface NamedFile {
  key: string;
  file: File;
}
