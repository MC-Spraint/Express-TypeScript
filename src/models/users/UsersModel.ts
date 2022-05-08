import mongoose,{ Schema } from "mongoose";
import { UsersDocument } from "./UsersDocument";
import { Users } from "./Users";


const UsersSchema: Schema = new Schema<Users>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: false},
    status: {type: Boolean, default: false, required: false},
    role: { type: String, enum: ["admin", "customer"], default: 'customer', required: false}
}, { timestamps: true });

UsersSchema.method('test', Users.prototype.test);


const UsersModel = mongoose.model<UsersDocument>('user', UsersSchema);

export { UsersModel };

