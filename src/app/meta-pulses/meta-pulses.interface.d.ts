declare interface MetaPulseData {
  metaPulseId: string;
  index: number;
  title: string;
  description: string;
  fields: MetaPulseFieldData[];
  meta: MetaPulseMetaData;
}

declare interface MetaPulseFieldData {
  key: string;
  valueType: string;
  value: any;
}

declare interface MetaPulseMetaData {
  addedBy: string;
  addedOn: number;
  lastUpdatedBy: string;
  lastUpdatedOn: number;
}
