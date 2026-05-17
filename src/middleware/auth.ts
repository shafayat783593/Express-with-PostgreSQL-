import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { pool } from "../db"
import { userRoute } from "../modules/user/user.route"
import type { ROLE } from "../types"


const auth = (...roles:ROLE[]) => {
    
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log("role",roles)

        try {
          // console.log(req.headers.authorization)
        // check if the token exists
        console.log(req.user)
        const token = req.headers.authorization
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized access !",
            })

        }
        const accsecretToken = process.env.JWT_ACCESS_TOKEN
//verify the token
        const decoded = jwt.verify(token as string, accsecretToken as string) as JwtPayload
// find ther user into database
        const userData = await pool.query(
            `
            SELECT * FROM users WHERE email=$1
            `
            , [decoded.email])
        const user = userData.rows[0]
    
        if (!user) {
            res.status(404).json({
                success: false,
                message:"User not found"
            })
        }
        if (!user.is_active) {
            res.status(403).json({
                success: false,
                message:"Forbidden !"
            })
            }
            
            // role validation................

            // role = ["admin","agnet"] 
            // user.role = "admin" |"user"|"agent"


            if (roles.length && !roles.includes(user.role)) {
                 res.status(403).json({
                success: false,
                message:"Forbidden !! You have no access "
            })
            }
        req.user = decoded  // req :{user : {} }

        next()
  } catch (error) {
    
    next(error)
  }
    }
}
export default auth