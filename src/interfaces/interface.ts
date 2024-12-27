export interface qPCRFileInfo {
  fileName: string;
  createdByUser: string;
  notes: string;
  iD: string;
  runStarted: string;
  runEnded: string;
  sampleVol: string;
  lidTemp: string;
  protocolFileName: string;
  plateSetupFileName: string;
  baseSerialNumber: string;
  opticalHeadSerialNumber: string;
  cFXMaestroVersion: string;
  wellgroup: string;
  amplificationstep: string;
  meltstep: string;
}

export interface qPCRrecord {
  well: string;
  fluor: string;
  target: string;
  content: string;
  replicate?: string;
  sample: string;
  biologicalSetName?: string;
  wellNote?: string;
  cq: string | number;
  startingQuantitySQ?: string;
  cqMean?: string;
  cqStdDev?: string;
  sQStdDev?: string;
  meltTemperature?: string | number;
  peakHeight?: string;
  beginTemperature?: string;
  endTemperature?: string;
  call?: string;
  endRFU?: string;
}

export interface qPCRFile {
  fileInfo: qPCRFileInfo;
  columns: Array<string>;
  counts: customqPCRCounts;
  data: Array<qPCRrecord>;
}

interface customqPCRCounts {
  uniqueSamples: string[];
  uniqueTargets: string[];
}

export interface SampleCount {
  sample: string;
  count: number;
}
