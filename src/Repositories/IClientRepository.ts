import {Client} from "../Models/ClientModel";
import {Color} from "../Models/ColorModel";


export interface IClientRepository{
    CreateClient(client:Client):Promise<boolean>;
    UpdateClient(client:Client):Promise<boolean>;
    DeleteClient(client:Client):Promise<boolean>;
    GetClient(client:Client):Promise<Client>;
}