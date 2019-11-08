declare interface MetaMilestoneData {
  metaMilestoneId: string;
  index: number;
  title: string;
  description: string;
  fields: MetaMilestoneFieldData[];
  meta: MetaMilestoneMetaData;
}

declare interface MetaMilestoneFieldData {
  key: string;
  valueType: string;
  value: any;
}

declare interface MetaMilestoneMetaData {
  addedBy: string;
  addedOn: number;
  lastUpdatedBy: string;
  lastUpdatedOn: number;
}
