import { Router } from "express";
import { createProfile, getProfile } from "./profile.controller";


const router = Router()

router.post('/', createProfile)
router.get("/:id",getProfile)

export const  profileRoute = router