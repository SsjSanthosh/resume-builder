import { NextApiRequest } from "next";

export interface UserType {
  name: String;
  email: String;
  password?: String;
  avatar: String;
}

export interface CustomApiRequest extends NextApiRequest {
  user?: UserType;
}
