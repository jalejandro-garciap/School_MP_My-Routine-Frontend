import { Transport } from "./transport.interface";

export interface Line {
  id?:        number;
  name:       string;
  enable:     boolean;
  transport:  Transport;
}