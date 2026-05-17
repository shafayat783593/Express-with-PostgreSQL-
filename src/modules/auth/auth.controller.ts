import type { Request, Response } from "express"
import { generateRefreshToken, loginIntoDB } from "./auth.service"


export const loginUser = async (req:Request,res:Response) => {
    
   try {
       const result = await loginIntoDB(req.body)
       const refreshToken = result.refreshToken
       res.cookie("refreshToken", refreshToken, {
           httpOnly: true,
           secure: false,  //in production => true
              sameSite: "lax",

       })
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

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
 

     try {
       const result = await generateRefreshToken(refreshToken)
  
      res.status(201).json({
            message: "Access token generated successfully",
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
