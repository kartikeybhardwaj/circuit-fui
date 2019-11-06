declare interface PulseData {
  pulseId: string;
  index: number;
  title: string;
  description: string;
  color: string;
  timeline: PulseTimelineData;
  assignees: string[];
  assigneesListCount: number;
  comments: PulseCommentData[];
  pulseMetaId: string;
  fields: PulseFieldData[];
  linkedProjectId: string;
  linkedMilestoneId: string;
  meta: PulseMetaData;
}

declare interface PulseTimelineData {
  begin: number;
  end: number;
}

declare interface PulseCommentData {
  comment: string;
  meta: PulseCommentMetaData;
}

declare interface PulseCommentMetaData {
  addedBy: string;
  addedOn: number;
}

declare interface PulseFieldData {
  key: string;
  value: string;
}

declare interface PulseMetaData {
  addedBy: string;
  addedOn: number;
  lastUpdatedBy: string;
  lastUpdatedOn: number;
}
