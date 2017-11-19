import {Injectable} from "@angular/core";


export interface ErrorLog {
    message: string;
    url: string;
    stack: string;
}

@Injectable()
export class LoggingService {
    constructor() {}

    /**
     * Log the error
     *
     * @param {string} message
     * @param {string} url
     * @param {string} stack
     */
    public log(error: ErrorLog): void {
        console.log(error);
    }

    public error(error: ErrorLog): void {
        console.error(error);
    }
}
