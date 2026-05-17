
import dotenv from "dotenv"
dotenv.config() 

import express, { request, type Application, type Request, type Response } from "express"

import {  pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profile/profile.route"
import { authRouter } from "./modules/auth/auth.route"
import { logger } from "./middleware/loogger"
const app: Application = express()



app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(logger)

app.get('/', (req: Request, res: Response) => {
  
    res.status(200).json({
        "message": "Express Server",
        "author": "Next Lavel"
    })
})


app.use("/api/users", userRoute)

app.use("/api/profiles", profileRoute)
app.use("/api/auth",authRouter)


export default app