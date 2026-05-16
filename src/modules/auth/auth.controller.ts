import type { Request, Response } from "express"
import { loginIntoDB } from "./auth.service"


export const loginUser = async (req:Request,res:Response) => {
    
   try {
    const result = await loginIntoDB(req.body)
      res.status(201).json({
            message: "login successfully",
            data: result
        })
} catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    } 

}