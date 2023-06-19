export interface DirectionsResponse {
  routes:    Route[];
  waypoints: Waypoint[];
  code:      string;
  uuid:      string;
}

export interface Route {
  weight_name: string;
  weight:      number;
  duration:    number;
  distance:    number;
  legs:        Leg[];
  geometry:    Geometry;
}

export interface Geometry {
  coordinates: [number, number][];
}

export interface Leg {
  via_waypoints: any[];
  admins:        Admin[];
  weight:        number;
  duration:      number;
  steps:         Step[];
  distance:      number;
  summary:       string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1:        string;
}

export interface Step {
  intersections: Intersection[];
  maneuver:      Maneuver;
  name:          string;
  duration:      number;
  distance:      number;
  driving_side:  DrivingSide;
  weight:        number;
  mode:          Mode;
  geometry:      string;
  destinations?: string;
  ref?:          string;
  exits?:        string;
}

export enum DrivingSide {
  Right = "right",
}

export interface Intersection {
  entry:              boolean[];
  bearings:           number[];
  duration?:          number;
  mapbox_streets_v8?: MapboxStreetsV8;
  is_urban?:          boolean;
  admin_index:        number;
  out?:               number;
  weight?:            number;
  geometry_index:     number;
  location:           number[];
  in?:                number;
  turn_weight?:       number;
  turn_duration?:     number;
  classes?:           ClassElement[];
  lanes?:             Lane[];
  traffic_signal?:    boolean;
}

export enum ClassElement {
  Motorway = "motorway",
  Restricted = "restricted",
}

export interface Lane {
  indications:       string[];
  valid:             boolean;
  active:            boolean;
  valid_indication?: ValidIndication;
}

export enum ValidIndication {
  SlightRight = "slight right",
  Straight = "straight",
}

export interface MapboxStreetsV8 {
  class: MapboxStreetsV8Class;
}

export enum MapboxStreetsV8Class {
  Motorway = "motorway",
  Secondary = "secondary",
  SecondaryLink = "secondary_link",
  Service = "service",
  Tertiary = "tertiary",
  TertiaryLink = "tertiary_link",
}

export interface Maneuver {
  type:           string;
  instruction:    string;
  bearing_after:  number;
  bearing_before: number;
  location:       number[];
  modifier?:      string;
}

export enum Mode {
  Driving = "driving",
}

export interface Waypoint {
  distance: number;
  name:     string;
  location: number[];
}
