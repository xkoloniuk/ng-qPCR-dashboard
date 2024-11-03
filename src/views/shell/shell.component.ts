import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
import { isNumber } from 'lodash';

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
  public qpcrFiles$!: Observable<qPCRFile[]>;
  public samples$!: Observable<string[]>;
  public targets$!: Observable<string[]>;
  #store = inject(Store);

  public ngOnInit() {
    this.qpcrFiles$ = this.#store.select(GlobalState.selectFiles);
    this.samples$ = this.#store.select(GlobalState.selectSamplesNames);
    this.targets$ = this.#store.select(GlobalState.selectTargetsNames);
  }

  public customHandler(files: File[]) {
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

      csvLines.forEach((csvLine) => {
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
            const camelCaseKey = this.toCamelCase(csValuesArr[0]);
            // @ts-ignore
            fileInfo[camelCaseKey] = dateValue;
            return;
          }
          //  remaining are assigned as they are
          // @ts-ignore
          const camelCaseKey = this.toCamelCase(csValuesArr[0]);

          // @ts-ignore
          fileInfo[camelCaseKey] = csValuesArr[1];
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
          const camelCaseKey = this.toCamelCase(columns[index]);

          // @ts-ignore
          obj[camelCaseKey] = value;
        });

        // either keep numeric values or replace with ''
        obj.cq = isNumber(+obj.cq) ? +obj.cq : '';
        obj.meltTemperature =
          obj.meltTemperature && isNumber(+obj.meltTemperature)
            ? +obj.meltTemperature
            : '';

        // handle empty data gracefully
        obj.target = obj.target ? obj.target : 'NA';
        obj.sample = obj.sample ? obj.sample : 'NA';

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
    const samples = inputData?.data?.map((wellData) => wellData.sample);
    const targets = inputData?.data?.map((wellData) => wellData.target);

    const uniqueSamples = Array.from(new Set(samples));
    const uniqueTargets = Array.from(new Set(targets));

    return { uniqueSamples, uniqueTargets };
  }

  private toCamelCase(text: string) {
    const symbolsToRemove = /[.\(\)]/g;

    const splicedSpacesText = text
      .replaceAll(symbolsToRemove, '')
      .split(' ')
      .join('');
    return (
      splicedSpacesText.charAt(0).toLowerCase() + splicedSpacesText.slice(1)
    );
  }
}
