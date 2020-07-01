import { ILoggerService } from "../Services/Logging/ILoggerService";
import { IDatabaseAccess } from "./IDatabaseAccess";
const mysql2 = require("mysql2/promise");

export class DatabaseAccess implements IDatabaseAccess{
    readonly iloggerservice:ILoggerService
    constructor(iloggerservice:ILoggerService){
        this.iloggerservice = iloggerservice
    }
    async getConnection() {
        try{
        const con = await mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            
        });
        return con;
        }catch(Error){
            this.iloggerservice.error(Error);
        }   
    }
}