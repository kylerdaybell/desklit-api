import { User } from "../../Models/UserModel";
import { IUserRepository } from "../../Repositories/IUserRepository";
import {IUserService} from "./IUserService";
import { v1 as uuidv1 } from 'uuid';

export class UserService implements IUserService {
    iuserrepository: IUserRepository;
    constructor(iuserrepository: IUserRepository) {
        this.iuserrepository = iuserrepository;
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
        if (result) {
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
