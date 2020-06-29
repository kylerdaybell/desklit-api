import {User} from "../Models/UserModel";

export interface IUserRepository {
    AddNewUser(user: User,guid:string): Promise<boolean>;
    GetExistingUser(user: User): Promise<User>;
    RemoveUser(user: User): Promise<boolean>;
    VerifyEmail(guid:string,level:string): Promise<boolean>;
    GetAvailablePhotos(email:string):Promise<number>;
    IncrementPhotoCount(email: string): Promise<boolean>;
    DecrementPhotoCount(email: string): Promise<boolean>;
}
