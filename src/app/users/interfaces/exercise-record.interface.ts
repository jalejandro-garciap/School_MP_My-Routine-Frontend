import { Passenger } from "./passenger.interface";

export interface ExerciseRecord {
  id:                 number;
  passenger:          Passenger;
  exercise:           Exercise;
  station:            string;
  duration:           number;
  challengeCompleted: boolean;
  createdAt:          string;
}

export interface Exercise {
  id:           number;
  exerciseType: string;
}
