declare interface LocationData {
  locationId: string;
  index: number;
  city: string;
  country: string;
  meta: LocationMetaData;
}

declare interface LocationMetaData {
  addedBy: string;
  addedOn: number;
  lastUpdatedBy: string;
  lastUpdatedOn: number;
}
