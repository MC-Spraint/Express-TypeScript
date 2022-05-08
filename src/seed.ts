import 'dotenv/config';
import { UsersModel } from "./models/users/UsersModel";
import { UsersDocument } from "./models/users/UsersDocument";
import { Users } from "./models/users/Users";
import mongoose from 'mongoose';

const db: string = process.env.MONGODB_URL as string;

//!Connecting MongoDB Atlas with Mongoose...        
class Seeder{
    private db: string = process.env.MONGODB_URL as string;
    private users: any[] = [
    new UsersModel({
    name:"Shubhankar Das",
    email:"a@gmail.com",
    password:"test11",
    age: 30,
    status: true,
    role:"admin"
    }),

    new UsersModel({
    name:"Avishek Mandal",
    email:"a@abcd.com",
    password:"test21",
    age: 28,
    status: true,
    role:"admin"
    }),

    new UsersModel({
    name:"Tanmoy Sarkar",
    email:"ab@aar.com",
    password:"test31",
    age: 26,
    status: true,
    role:"admin"
    }),

    new UsersModel({
    name:"Riya",
    email:"abc@aj.com",
    password:"test41",
    age:29,
    status:false,
    role:"customer"
    }),

    new UsersModel({
    name:"Kaizar",
    email:"abc@ab3.com",
    password:"test51",
    age:27,
    status:false,
    role:"customer"
    })

    ];

    public async addUsers() :Promise<void> {
        let databaseURI: string=process.env.MONGODB_URL as string;
        mongoose.connect(databaseURI)
        .then(() => {
            let count:number = 0; let failedUsers: number = 0;
            for (let i=0; i<this.users.length; i++){
                this.users[i].save(async (err:any,res:any)=>{
                    if(err){
                        failedUsers++;
                        console.log(`${failedUsers} users failed to save`);}
                    else{
                        count++;
                        console.log(`${count} users have been added`);
                        if(count===this.users.length){
                            console.log("All ussers have been added successfully");
                            mongoose.disconnect();
                        }
                    }
                })
            }
        })
        .catch((error:Error) => {
            console.log(error+"\n❌ Database connection failed..");
        })
    }
}

const seeder: Seeder = new Seeder();
seeder.addUsers();











