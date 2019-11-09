declare interface AddMetaPulseData {
  title: string;
  description: string;
  fields: AddMetaPulseFieldsData[];
}

declare interface AddMetaPulseFieldsData {
  key: string;
  valueType: string;
  value: any;
}
