declare interface MilestoneData {
  milestoneId: string;
  index: number;
  title: string;
  description: string;
  timeline: MilestoneTimelineData;
  pulsesList: string[];
  pulsesListCount: number;
  milestoneMetaId: string;
  fields: MilestoneFieldData[];
  linkedProjectId: string;
  meta: MilestoneMetaData;
}

declare interface MilestoneTimelineData {
  begin: number;
  end: number;
}

declare interface MilestoneFieldData {
  key: string;
  value: string;
}

declare interface MilestoneMetaData {
  addedBy: string;
  addedOn: number;
  lastUpdatedBy: string;
  lastUpdatedOn: number;
}
