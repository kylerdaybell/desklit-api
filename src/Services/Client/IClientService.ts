import { Client } from "../..//Models/ClientModel";

export interface IClientService{
    CreateClient(client:Client):Promise<boolean>;
    UpdateClient(client:Client):Promise<boolean>;
    DeleteClient(client:Client):Promise<boolean>;
    GetClient(client:Client):Promise<Client>;
}