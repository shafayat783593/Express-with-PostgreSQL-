import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { createUser, deleteUser, getAllUser, getsingleUser, updateUserData } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";


const router = Router()



router.post("/",createUser )


router.get("/",auth(USER_ROLE.admin,USER_ROLE.agent,USER_ROLE.user),getAllUser )


router.get("/:id",getsingleUser)

router.put("/:id",updateUserData )

router.delete("/:id",deleteUser )


export const userRoute = router