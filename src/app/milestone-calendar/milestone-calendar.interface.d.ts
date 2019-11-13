declare interface MilestoneCalendarData {
  milestoneId: string;
  index: number;
  title: string;
  timeline: MilestoneCalendarTimelineData;
  linkedProjectId: string;
}

declare interface MilestoneCalendarTimelineData {
  begin: number;
  end: number;
}
