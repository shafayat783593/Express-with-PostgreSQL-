import type { Request, Response } from "express"
import { createProfileIntoDB, getProfileFromDB } from "./profile.service"

export const createProfile = async (req: Request, res: Response) => {
    
    try {
    const result = await createProfileIntoDB(req.body)
      res.status(201).json({
            message: "Profile Created successfully",
            data: result.rows[0]
        })
} catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    } 
}


export const getProfile = async (req: Request, res: Response) => {
    const {id}= req.params
    try {
        const result = await getProfileFromDB(id as string)
        res.status(200).json({
            success: true,
            message: "Profile ",
            data:result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error:error
        })
    }
}