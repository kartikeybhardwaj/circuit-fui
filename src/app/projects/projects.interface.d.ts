declare interface ProjectData {
  projectId: string;
  index: number;
  title: string;
  description: string;
  visibility: string;
  visibilityIcon: string;
  members: ProjectMemberData[];
  milestonesList: string[];
  milestonesListCount: number;
  projectMetaId: string;
  fields: ProjectFieldData[];
  meta: ProjectMetaData;
}

declare interface ProjectMemberData {
  userId: string;
  roleId: string;
}

declare interface ProjectFieldData {
  key: string;
  value: string;
}

declare interface ProjectMetaData {
  addedBy: string;
  addedOn: number;
  lastUpdatedBy: string;
  lastUpdatedOn: number;
}
