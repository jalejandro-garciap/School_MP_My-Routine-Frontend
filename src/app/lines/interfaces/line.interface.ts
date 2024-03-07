import { Transport } from "../../transports/interfaces/transport.interface";

export interface Line {
  id?:        number;
  name:       string;
  enable:     boolean;
  transport:  Transport;
}