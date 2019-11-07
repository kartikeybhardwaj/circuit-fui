declare interface MetaProjectData {
  metaProjectId: string;
  index: number;
  title: string;
  description: string;
  fields: MetaProjectFieldData[];
  meta: MetaProjectMetaData;
}

declare interface MetaProjectFieldData {
  key: string;
  valueType: string;
  value: any;
}

declare interface MetaProjectMetaData {
  addedBy: string;
  addedOn: number;
  lastUpdatedBy: string;
  lastUpdatedOn: number;
}
