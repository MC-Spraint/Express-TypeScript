"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
class Users {
    constructor(name, email, password) {
        this.age = 25;
        this.status = false;
        this.role = "customer";
        this.name = name;
        this.email = email;
        this.password = password;
    }
    test() {
        console.log("I do nothing, I am a testing method,\n" +
            "you can make me do things by registering me in usersSchema.method(test(), Users.prototype.test);");
    }
}
exports.Users = Users;
// register each method at schema
//# sourceMappingURL=Users.js.map