import { ILoggerService } from "./ILoggerService";

export class ConsoleLoggerService implements ILoggerService{
    log(Message: string): void {
        console.log(Message)
    }
    warn(Message: string): void {
        console.warn(Message);
    }
    error(Message: string): void {
        console.error(Message);
    }

}