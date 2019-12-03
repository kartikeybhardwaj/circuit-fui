declare interface EditProjectData {
  projectId: string;
  title: string;
  description: string;
  visibility: string;
  members: EditProjectMemberData[];
  membersTodo: EditProjectMemberTodoData;
  projectMetaId: string;
  fields: EditProjectFieldData[];
}

declare interface EditProjectMemberData {
  username: string;
  displayname: string;
  roleId: string;
}

declare interface EditProjectMemberTodoData {
  toAdd: string[];
  toRemove: string[];
}

declare interface EditProjectFieldData {
  key: string;
  value: string;
}
