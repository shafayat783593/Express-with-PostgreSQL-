import type { Request, Response } from "express"
import { createUserIntoDB, deleteUserFromDB, getAllUserFromDB, getsingleUserFromDB, updateUserIntoDB } from "./user.service"
import { sendRespons } from "../../utility/sendResponse"


export const createUser = async (req: Request, res: Response) => {

    try {
        const result = await createUserIntoDB(req.body)
        sendRespons(res, {
            statusCode: 201,
            success: true,
            message: "user Create successfully",
            data: result.rows[0]
        })
    } catch (error: any) {

        sendRespons(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

export const getAllUser = async (req: Request, res: Response) => {
    console.log("user", req.user)
    try {
        const result = await getAllUserFromDB()


        sendRespons(res, {
            statusCode: 201,
            success: true,
            message: "Users retrived successfully",
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

export const getsingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await getsingleUserFromDB(id as string)
        if (result.length === 0) {


            sendRespons(res, {
                statusCode: 404,
                success: false,
                message: "Users not found",
                data: {}
            })
        }
        sendRespons(res, {
            statusCode: 200,
            success: true,
            message: "Users retrived successfully",
            data: result
        })
    } catch (error: any) {


        sendRespons(res, {
            statusCode: 404,
            success: false,
            message: "Users not found",
            data: {}
        }
        )
    }
}


export const updateUserData = async (req: Request, res: Response) => {
    const { id } = req.params
    // const { name, password, age, is_active } = req.body


    try {
        const result = await updateUserIntoDB(req.body, id as string)


        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users not found",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "Users updated successfully",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteUserFromDB(id as string);

        // If no rows were returned, the user didn't exist
        if (result.rows.length === 0) {
            return res.status(404).json({ // ✅ Added 'return'
                success: false,
                message: "User not found",
                data: {}
            });
        }

        // Successfully deleted
        return res.status(200).json({ // ✅ Added 'return'
            success: true,
            message: "User deleted successfully",
            data: {}
        });

    } catch (error: any) {
        return res.status(500).json({ // ✅ Added 'return'
            success: false,
            message: error.message,
            error: error
        });
    }
};