declare interface EditMilestoneData {
  projectId: string;
  milestoneId: string;
  title: string;
  description: string;
  locationId: string;
  timeline: EditMilestoneTimelineData;
  milestoneMetaId: string;
  fields: EditMilestoneFieldData[];
}

declare interface EditMilestoneTimelineData {
  begin: string;
  end: string;
}

declare interface EditMilestoneFieldData {
  key: string;
  value: string;
}
