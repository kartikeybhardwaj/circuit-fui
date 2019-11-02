declare interface RoleData {
  roleId: string;
  index: number;
  title: string;
  description: string;
  canModifyUsersRole: boolean;
  canModifyLocations: boolean;
  canModifyProjects: boolean;
  canModifyMilestones: boolean;
  canModifyPulses: boolean;
  meta: RoleMetaData;
}

declare interface RoleMetaData {
  addedBy: string;
  addedOn: string;
  lastUpdatedBy: string;
  lastUpdatedOn: string;
}
