import { User } from "../../Models/UserModel";

export interface IUserService {
    ValidateUser(user: User): Promise<User|null>;
    RemoveUser(user: User): Promise<boolean>;
    CreateUser(user: User,level:string): Promise<boolean>;
    GetUserByEmail(user: User): Promise<User>;
    VerifyEmail(guid: string): Promise<boolean>;
}
