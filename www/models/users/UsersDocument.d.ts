import { Users } from "./Users";
import { Document } from "mongoose";
export interface UsersDocument extends Users, Document {
}
