declare interface AddProjectData {
  title: string;
  description: string;
  visibility: string;
  members: AddProjectMemberData[];
  projectMetaId: string;
  fields: AddProjectFieldData[];
}

declare interface AddProjectMemberData {
  username: string;
  roleId: string;
}

declare interface AddProjectFieldData {
  key: string;
  value: string;
}
