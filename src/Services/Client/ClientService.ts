import {IClientService} from "./IClientService"
import { Client } from "../..//Models/ClientModel";
import { IClientRepository } from "../../Repositories/IClientRepository";
import { ILoggerService } from "../Logging/ILoggerService";

export class ClientService implements IClientService{
    private iclientrepository:IClientRepository
    private iloggerservice:ILoggerService
    constructor(iclientrepository:IClientRepository,iloggerservice:ILoggerService){
        this.iclientrepository = iclientrepository;
        this.iloggerservice = iloggerservice;
    }
    public async CreateClient(client: Client): Promise<boolean> {
        if(await this.iclientrepository.CreateClient){
            return true;
        }else{
            return false
        }
    }
    UpdateClient(client: Client): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    DeleteClient(client: Client): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    GetClient(client: Client): Promise<import("../../Models/ClientModel").Client> {
        throw new Error("Method not implemented.");
    }
    
}