declare interface TravelData {
  locationId: string;
  index: number;
  name: string;
  timeline: TravelTimelineData;
  isUpdating: boolean;
}

declare interface TravelTimelineData {
  begin: Date;
  end: Date;
}
