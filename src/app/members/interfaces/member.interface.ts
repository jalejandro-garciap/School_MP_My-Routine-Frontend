import { Role } from "src/app/auth/interfaces/auth.interface";

export interface Member {
  id?:        number;
  email:	    string;
  google?:	  boolean;
  isActive?:	boolean;
  password:	  string;
  roles:      Role[];
  username:	  string;
}