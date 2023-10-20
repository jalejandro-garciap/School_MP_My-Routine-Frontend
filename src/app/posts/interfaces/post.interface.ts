// Generated by https://quicktype.io

import { Category } from "src/app/categories/interfaces/category.interface";
import { User } from "src/app/users/interfaces/user.interface";

export interface Post {
  id:         number;
  title:      string;
  caption:    string;
  body:       string;
  url:        string;
  isActive:   boolean;
  createdAt:  string;
  user:       User;
  categories: Category[];
}
