import {User} from "../Models/UserModel";

export interface IUserRepository {
    AddNewUser(user: User,guid:string): Promise<boolean>;
    GetExistingUser(user: User): Promise<User>;
    RemoveUser(user: User): Promise<boolean>;
}
