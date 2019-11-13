declare interface UserCalendarData {
  pulseId: string;
  index: number;
  title: string;
  color: string;
  timeline: UserCalendarTimelineData;
  linkedProjectId: string;
  linkedMilestoneId: string;
}

declare interface UserCalendarTimelineData {
  begin: number;
  end: number;
}
