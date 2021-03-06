import { User } from "../Models/UserModel";
import { IUserRepository } from "./IUserRepository";
import { ILoggerService } from "../Services/Logging/ILoggerService";
import { IDatabaseAccess } from "./IDatabaseAccess";
const mysql2 = require("mysql2/promise");

export class UserRepository implements IUserRepository {
    readonly iloggerservice:ILoggerService
    readonly idatabaseaccess:IDatabaseAccess
    constructor(iloggerservice:ILoggerService,idatabaseaccess:IDatabaseAccess){
        this.iloggerservice = iloggerservice
        this.idatabaseaccess= idatabaseaccess;
    }
    public async AddNewUser(user: User,guid:string): Promise<any> {
        if (user.email != "" && user.password != "") {
            const con = await this.idatabaseaccess.getConnection();
            try {
                const [rows] = await con.execute("INSERT INTO USER (EMAIL,PASSWORD,ROLE) VALUE (?,?,?)", [user.email, user.password, user.authorization]);
                return true;
            } catch (error) {
                return false;
            } finally {
                con.end();
            }
        }
    }
    public async GetExistingUser(user: User): Promise<User> {
        const con = await this.idatabaseaccess.getConnection();
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
        const con = await this.idatabaseaccess.getConnection();
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
}
