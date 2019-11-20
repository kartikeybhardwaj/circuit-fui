declare interface CheckUsersAvailabilityData {
  milestoneId: string;
  timeline: CheckUsersAvailabilityTimelineData;
  members: string[];
}

declare interface CheckUsersAvailabilityTimelineData {
  begin: string;
  end: string;
}
