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

export interface qPCRFile {
  fileInfo: qPCRFileInfo;
  columns: Array<string>;
  counts: customqPCRCounts;
  data: Array<qPCRrecord>
}

interface customqPCRCounts {
  uniqueSamples: string[];
  uniqueTargets: string[]
}
