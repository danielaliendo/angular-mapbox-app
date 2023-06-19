export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:         string;
  type:       string;
  place_type: string[];
  relevance:  number;
  properties: Properties;
  text:       string;
  text_es?:    string;
  place_name: string;
  center:     number[];
  geometry:   Geometry;
  context:    Context[];
}

export interface Context {
  id:          string;
  mapbox_id:   string;
  text:        string;
  wikidata?:   Wikidata;
  short_code?: ShortCode;
}

export enum ShortCode {
  Es = "es",
  EsB = "ES-B",
}

export enum Wikidata {
  Q15602 = "Q15602",
  Q29 = "Q29",
  Q81949 = "Q81949",
}

export interface Geometry {
  coordinates: number[];
  type:        string;
}

export interface Properties {
  foursquare: string;
  landmark:   boolean;
  address?:   string;
  category:   string;
  maki?:      string;
}
