export class Users{
    name: string;
    email: string;
    age: number = 25;
    password: string;
    status: boolean=false;
    role: string = "customer";

    public constructor(name:string, email:string, password:string){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public test(): void {
        console.log("I do nothing, I am a testing method,\n"+
        "you can make me do things by registering me in usersSchema.method(test(), Users.prototype.test);");
    }

}
// register each method at schema

