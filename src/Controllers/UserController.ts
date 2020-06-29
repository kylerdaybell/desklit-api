import { Request, Response } from "express";
import { User } from "../Models/UserModel";
import { IAuthenticationService } from "../Services/Authentication/IAuthenticationService";
import { IUserService } from "../Services/Users/IUserService";
import { ILoggerService } from "../Services/Logging/ILoggerService";

export class UserController {
    private iuserservice: IUserService;
    private iauthenticationservice: IAuthenticationService;
    private iloggerservice: ILoggerService;
    constructor(iloggerservice:ILoggerService, iuserservice: IUserService, iauthenticationservice: IAuthenticationService) {
        this.iuserservice = iuserservice;
        this.iauthenticationservice = iauthenticationservice;
        this.iloggerservice=iloggerservice
    }
    public async PostRegister(req: Request, res: Response): Promise<void> {
        this.iloggerservice.log("IP:"+req.connection.remoteAddress+" Controller: User Function: PostClientRegister Time:"+Date.now());
        const user = new User(null, req.body.User.email, req.body.User.password, "unverified");
        if (await this.iuserservice.CreateUser(user,"client")) {
            res.write(JSON.stringify({Status: "success", Message: "The client was successfuly added to the database"}));
            res.end();
            return;
        } else {
            res.write(JSON.stringify({Status: "failure", Message: "Failed to add the client to the database"}));
            res.end();
            return;
        }
    }
    
    public async PostLogin(req: Request, res: Response): Promise<void> {
        this.iloggerservice.log("IP:"+req.connection.remoteAddress+" Controller: User Function: PostLogin Time:"+Date.now());
        await this.iauthenticationservice.AuthenticateUser(req, res);
    }
    public async PostDeleteUser(req: Request, res: Response): Promise<void>  {
        this.iloggerservice.log("IP:"+req.connection.remoteAddress+" Controller: User Function: PostDeleteUser Time:"+Date.now());
        const usertobedeleted = new User(null, req.body.User.email, "", req.body.User.authorization);
        const user: User = await this.iauthenticationservice.AuthenticateToken(req, res);
        if (user.email == usertobedeleted.email) {
            if (await this.iuserservice.RemoveUser(usertobedeleted)) {
                res.write(JSON.stringify({Status: "success", Message: "the user was successfully removed."}));
                res.end();
                return;
            } else {
                res.write(JSON.stringify({Status: "failure", Message: "The user does not exsist or the password is incorrect"}));
                res.end();
                return;
            }
        }

    }

    public async GetRoot(req: Request, res: Response): Promise<void> {
        this.iloggerservice.log("IP:"+req.connection.remoteAddress+" Controller: User Function: GetRoot Time:"+Date.now());
        const user = await this.iauthenticationservice.AuthorizeToken(req, res, "free");
        if (user) {
            const response: string = JSON.stringify({Status: "success", Message: "You are authorized"});
            res.write(response);
            res.end();
        }

    }

    public async VerifyEmail(req:Request,res:Response): Promise<void>{
        this.iloggerservice.log("IP:"+req.connection.remoteAddress+" Controller: User Function: VerifyClientEmail Time:"+Date.now());

        const guid = req.params.guid;
        if (await this.iuserservice.VerifyEmail(guid)) {
            res.write(JSON.stringify({Status: "success", Message: "The client email was verified"}));
            res.end();
            return;
        } else {
            res.write(JSON.stringify({Status: "failure", Message: "The client email was not verified"}));
            res.end();
            return;
        }
    }

}
