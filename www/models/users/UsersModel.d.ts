import mongoose from "mongoose";
import { UsersDocument } from "./UsersDocument";
declare const UsersModel: mongoose.Model<UsersDocument, {}, {}, {}>;
export { UsersModel };
