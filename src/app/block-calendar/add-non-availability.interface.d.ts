declare interface AddNonAvailabilityData {
  reason: string;
  timeline: AddNonAvailabilityTimelineData;
}

declare interface AddNonAvailabilityTimelineData {
  begin: string;
  end: string;
}
