import { User } from "../Models/UserModel";
import { IUserRepository } from "./IUserRepository";
import { ILoggerService } from "../Services/Logging/ILoggerService";
const mysql2 = require("mysql2/promise");

export class UserRepository implements IUserRepository {
    readonly iloggerservice:ILoggerService
    constructor(iloggerservice:ILoggerService){
        this.iloggerservice = iloggerservice
    }
    async getConnection() {
        const con = await mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            
        });
        return con;
    }
    public async AddNewUser(user: User,guid:string): Promise<any> {
        if (user.email != "" && user.password != "") {
            const con = await this.getConnection();
            try {
                const [rows] = await con.execute("INSERT INTO USER (EMAIL,PASSWORD,ROLE,EMAILCODE,PHOTO_COUNT) VALUE (?,?,?,?,?)", [user.email, user.password, user.authorization,guid,0]);
                return true;
            } catch (error) {
                return false;
            } finally {
                con.end();
            }
        }
    }
    public async GetExistingUser(user: User): Promise<User> {
        const con = await this.getConnection();
        try{
            const [rows] = await con.execute("SELECT * from USER where EMAIL = ?", [user.email]);
            if (typeof rows[0] != "undefined") {
                const DBuser = new User(rows[0].ID, rows[0].EMAIL, rows[0].PASSWORD, rows[0].ROLE);
                return DBuser;
            } else {
                throw new Error("user is undefined")
            }
        }catch(error){
            this.iloggerservice.error(error);
            const DBuser = new User(null, "void", "void", "unverified");
            return DBuser;
        }finally{
            con.end();
        }
    }
    public async RemoveUser(user: User): Promise<any> {
        const con = await this.getConnection();
        try {
            const [rows] = await con.execute("Delete from USER where EMAIL = ?", [user.email]);
            return true;
        } catch (error) {
            this.iloggerservice.error(error);
            return false;
        } finally {
            con.end();
        }
    }
    public async VerifyEmail(guid: string,level: string): Promise<boolean> {
        const con = await this.getConnection();
        try {
            const [rows] = await con.execute("Select ID from USER where EMAILCODE = ?", [guid]);
            const userID = rows[0].ID;
            const [rows2] = await con.execute("UPDATE USER set EMAILCODE = ?,ROLE=? WHERE ID = ?",["NULL",level,userID])
            return true;
        } catch (error) {
            this.iloggerservice.error(error);
            return false;
        } finally {
            con.end();
        }
    }
    public async GetAvailablePhotos(email: string): Promise<number> {
        const con = await this.getConnection();
        try {
            const [rows] = await con.execute("Select ROLE,PHOTO_COUNT from USER where EMAIL = ?", [email]);
            const role = rows[0].ROLE;
            const photoCount = rows[0].PHOTO_COUNT;
            if(role == "free"){
                return 20- photoCount
            }else if(role == "pro"){
                return 200 - photoCount
            }else if(role == "expert"){
                return 2000 - photoCount
            }
            return 1;
        } catch (error) {
            this.iloggerservice.error(error);
            return 0;
        } finally {
            con.end();
        }
    }

    public async IncrementPhotoCount(email: string): Promise<boolean>{
        const con = await this.getConnection();
        try {
            const [rows] = await con.execute("UPDATE USER SET PHOTO_COUNT = PHOTO_COUNT + 1 where EMAIL = ?", [email]);
            return true;
        } catch (error) {
            this.iloggerservice.error(error);
            return false;
        } finally {
            con.end();
        }
    }


    public async DecrementPhotoCount(email: string): Promise<boolean>{
        const con = await this.getConnection();
        try {
            const [rows] = await con.execute("UPDATE USER SET PHOTO_COUNT = PHOTO_COUNT - 1 where EMAIL = ?", [email]);
            return true;
        } catch (error) {
            this.iloggerservice.error(error);
            return false;
        } finally {
            con.end();
        }
    }
}
