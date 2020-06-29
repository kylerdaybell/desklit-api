import { User } from "../../Models/UserModel";
import { IUserRepository } from "../../Repositories/IUserRepository";
import {IUserService} from "./IUserService";
import { IMailerService } from "../Email/IMailerService";
import { v1 as uuidv1 } from 'uuid';

export class UserService implements IUserService {
    iuserrepository: IUserRepository;
    imailservice: IMailerService
    constructor(iuserrepository: IUserRepository,imailservice:IMailerService) {
        this.iuserrepository = iuserrepository;
        this.imailservice = imailservice;
    }
    //comment
    public async VerifyEmail(guid: string): Promise<boolean> {
        try{
            return await this.iuserrepository.VerifyEmail(guid,"free");
        }catch(e){
            return false
        }
    } 
    public async ValidateUser(user: User): Promise<User|null> {
        const DBUser: User = await this.iuserrepository.GetExistingUser(user);
        if (DBUser.email !== "void" && DBUser.ValidatePassword(user.password)) {
            return DBUser;
        } else {
            return null;
        }
    }
    public async RemoveUser(user: User): Promise<boolean> {
        const DBUser = await this.iuserrepository.GetExistingUser(user);
        if (DBUser.email !== "void") {
            const result = this.iuserrepository.RemoveUser(DBUser);
            if (result) {
                return true;
            }
        }
        return false;
    }
    public async CreateUser(user: User,level: string): Promise<boolean> {
        const sercureuser = user.HashPassword();
        const guid = uuidv1()
        const result: boolean =  await this.iuserrepository.AddNewUser(sercureuser,guid);
        let emailsent = false
        emailsent = await this.imailservice.SendRegistrationEmail(user.email,guid)

        if (result && emailsent) {
            return true;
        } else {
            return false;
        }
    }
    public async GetUserByEmail(user: User): Promise<User> {
        const DBUser = await this.iuserrepository.GetExistingUser(user);
        return DBUser;
    }
}
