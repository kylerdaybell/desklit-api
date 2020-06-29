import { Request, Response } from "express";
import { User } from "../../Models/UserModel";

export interface IAuthenticationService {
    // validates a username and password and returns a token to the calling service
    AuthenticateUser(req: Request, res: Response): Promise<void>;
    // validates the token that a user is using
    AuthenticateToken(req: Request, res: Response): Promise<User|null>;
    // validates the token and insures that the authorization level of the user is correct.
    AuthorizeToken(req: Request, res: Response, authorizationLevel: "unverified"|"free"|"pro"|"expert" ): Promise<User|null>;
}
