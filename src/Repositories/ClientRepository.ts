import {IClientRepository} from "./IClientRepository";
import { Client } from "..//Models/ClientModel";

export class ClientRepository implements IClientRepository{
    CreateClient(client: Client): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    UpdateClient(client: Client): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    DeleteClient(client: Client): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    GetClient(client: Client): Promise<import("../Models/ClientModel").Client> {
        throw new Error("Method not implemented.");
    }

}