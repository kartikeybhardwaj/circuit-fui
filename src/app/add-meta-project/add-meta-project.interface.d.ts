declare interface AddMetaProjectData {
    title: string;
    description: string;
    fields: AddMetaProjectFieldsData[];
}

declare interface AddMetaProjectFieldsData {
    key: string;
    valueType: string;
    value: any;
}
