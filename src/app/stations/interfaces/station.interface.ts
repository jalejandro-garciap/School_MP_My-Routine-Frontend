import { Line } from "../../lines/interfaces/line.interface";

export interface Station {
  id?:        number;
  name:       string;
  enable:     boolean;
  line:       Line;
}