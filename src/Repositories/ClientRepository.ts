import {IClientRepository} from "./IClientRepository";
import { Client } from "..//Models/ClientModel";
import { ILoggerService } from "../Services/Logging/ILoggerService";
import { IDatabaseAccess } from "./IDatabaseAccess";

export class ClientRepository implements IClientRepository{
    readonly iloggerservice:ILoggerService
    readonly idatabaseaccess:IDatabaseAccess
    constructor(iloggerservice:ILoggerService,idatabaseaccess:IDatabaseAccess){
        this.iloggerservice = iloggerservice
        this.idatabaseaccess= idatabaseaccess;
    }
    public async CreateClient(client: Client): Promise<boolean> {
        let con = await this.idatabaseaccess.getConnection()
        try {
            let [rows] = await con.execute("INSERT INTO CLIENT (NAME,COLOR,DESCRIPTION) VALUE (?,?,?)", [client.name, client.color,client.description]);
            for(let i in client.domains){
                [rows] = await con.execute("INSERT INTO DOMAIN (NAME,CLIENT_ID) VALUE (?,(Select ID from CLIENT WHERE NAME = ?))",[i,client.name])
            }
            return true;
        } catch (error) {
            return false;
        } finally {
            con.end();
        }        
    }
    public async UpdateClient(client: Client): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async DeleteClient(client: Client): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async GetClient(client: Client): Promise<Client> {
        throw new Error("Method not implemented.");
    }

}