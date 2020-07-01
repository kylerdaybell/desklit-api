import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
//controllers
import { UserController } from "./Controllers/UserController";


//services
import {ConsoleLoggerService} from "./Services/Logging/ConsoleLoggerService"
import { JWTAuthenticationService } from "./Services/Authentication/JWTAuthenticateService";
import { UserService } from "./Services/Users/UserService";


//repositories
import {UserRepository} from "./Repositories/UserRepository";
import { DatabaseAccess } from "./Repositories/DatabaseAccess";


const result = dotenv.config();

if (result.error) {
  throw result.error;
}
//Logging Service
const ILoggerService = new ConsoleLoggerService()

//Database Access
const IDatabaseAccess = new DatabaseAccess(ILoggerService);

// repositorys
const IUserRepository = new UserRepository(ILoggerService, IDatabaseAccess);

// services

const IUserService = new UserService(IUserRepository);
const IAuthenticationService = new JWTAuthenticationService(IUserService);

// controllers
const userController = new UserController(ILoggerService,IUserService, IAuthenticationService);



// app setup.
const app = express();
const bodyParser = require("body-parser");
const json = bodyParser.json({limit: "50mb", type: "application/json"});



app.use(cors());

//User Routes
app.get("/", json,(req, res) => userController.GetRoot(req, res));
app.post("/Register", json,(req, res) => userController.PostRegister(req, res));
app.post("/Login", json,(req, res) => userController.PostLogin(req, res));
app.post("/DeleteAccount",json, (req, res) => userController.PostDeleteUser(req, res));


app.listen(80, () =>
  console.log("Example app listening on port 80!"),
);
