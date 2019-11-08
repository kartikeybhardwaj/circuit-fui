declare interface AddMilestoneData {
  title: string;
  description: string;
  timeline: AddMilestoneTimelineData;
  milestoneMetaId: string;
  fields: AddMilestoneFieldData[];
  linkedProjectId: string;
}

declare interface AddMilestoneTimelineData {
  begin: string;
  end: string;
}

declare interface AddMilestoneFieldData {
  key: string;
  value: string;
}
