declare interface EditPulseData {
  pulseId: string;
  milestoneId: string;
  projectId: string;
  title: string;
  description: string;
  timeline: EditPulseTimelineData;
  color: string;
  assignees: string[];
  assigneesTodo: EditPulseAssigneesTodoData;
  pulseMetaId: string;
  fields: EditPulseFieldData[];
}

declare interface EditPulseTimelineData {
  begin: string;
  end: string;
}

declare interface EditPulseAssigneesTodoData {
  toAdd: string[];
  toRemove: string[];
}

declare interface EditPulseFieldData {
  key: string;
  value: string;
}
