declare interface NonAvailabilityData {
  index: number;
  reason: string;
  timeline: NonAvailabilityTimelineData;
  isUpdating: boolean;
}

declare interface NonAvailabilityTimelineData {
  begin: Date;
  end: Date;
}
