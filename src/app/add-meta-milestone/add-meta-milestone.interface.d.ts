declare interface AddMetaMilestoneData {
  title: string;
  description: string;
  fields: AddMetaMilestoneFieldsData[];
}

declare interface AddMetaMilestoneFieldsData {
  key: string;
  valueType: string;
  value: any;
}
