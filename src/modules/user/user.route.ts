import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { createUser, deleteUser, getAllUser, getsingleUser, updateUserData } from "./user.controller";


const router = Router()




router.post("/",createUser )


router.get("/",getAllUser )


router.get("/:id",getsingleUser)

router.put("/:id",updateUserData )

router.delete("/:id",deleteUser )


export const userRoute = router