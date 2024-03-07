import { Passenger } from "src/app/users/interfaces/passenger.interface";
import { Station } from "../../stations/interfaces/station.interface";

export interface History {
  id?:                number;
  date:               string;
  duration:           string;
  exercise:           string;
  repetitionsDone:    number;
  targetReps:         number;
  challengeCompleted: boolean;
  passenger:          Passenger;
  station:            Station;
}