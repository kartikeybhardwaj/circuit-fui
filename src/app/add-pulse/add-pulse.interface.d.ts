declare interface AddPulseData {
  title: string;
  description: string;
  timeline: AddPulseTimelineData;
  color: string;
  assignees: string[];
  pulseMetaId: string;
  fields: AddPulseFieldData[];
  linkedProjectId: string;
  linkedMilestoneId: string;
}

declare interface AddPulseTimelineData {
  begin: string;
  end: string;
}

declare interface AddPulseFieldData {
  key: string;
  value: string;
}
