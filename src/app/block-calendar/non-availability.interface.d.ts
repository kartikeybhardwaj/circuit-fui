declare interface NonAvailabilityData {
  index: number;
  reason: string;
  timeline: NonAvailabilityTimelineData;
  isUpdating: boolean;
}

declare interface NonAvailabilityTimelineData {
  begin: string;
  end: string;
}
