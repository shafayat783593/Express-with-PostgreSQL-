import type { Request, Response } from "express"
import fs from "fs"
 export const logger = (req: Request, res: Response, next: any) => {
    console.log("method =URl TIme", req.method, req.url, Date.now())
    const log = `\nMethod-> ${req.method} \nURL-> ${req.url} \nTime-> ${Date.now()} \n`
    fs.appendFile("server.log", log, (err: any) => {
        if (err) {
            console.log("Unable to log the request");
        }
        next();
    })}