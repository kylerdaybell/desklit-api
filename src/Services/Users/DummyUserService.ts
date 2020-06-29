import { User } from "../../Models/UserModel";
import { IUserRepository } from "../../Repositories/IUserRepository";
import {IUserService} from "./IUserService";
import { promises } from "fs";

export class DummyUserService implements IUserService {
    constructor(iuserrepository: IUserRepository) {
    }
    VerifyEmail(guid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    VerifyClientEmail(guid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    VerifyPhotographerEmail(guid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    EmailVerification(code: string): Promise<boolean> {
        if(code == "12345"){
            return Promise.resolve(true);
        }else{
            return Promise.resolve(false);
        }
    }
    ValidateUser(user: User): Promise<User> {
        if (user.email == "kyler.daybell@gmail.com" && user.password == "kyler" && user.authorization == "free") {
            return Promise.resolve(new User(0,"kyler.daybell@gmail.com","kyler","free"));
        }
    }
    public async RemoveUser(user: User): Promise<boolean> {
        return true;
    }
    public async CreateUser(user: User): Promise<boolean> {
        return true;
    }
    public async GetUserByEmail(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

}
