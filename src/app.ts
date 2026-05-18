
import dotenv from "dotenv"
dotenv.config() 

import express, { request, type Application, type NextFunction, type Request, type Response } from "express"

import {  pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profile/profile.route"
import { authRouter } from "./modules/auth/auth.route"
import { logger } from "./middleware/loogger"
import Cookeparce from "cookie-parser"
import cors from "cors"
import { globalErrorHandler } from "./middleware/globalErrorHandeling"
const app: Application = express()


app.use(Cookeparce())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(logger)



app.use(cors({
  origin: 'http://localhost:3000',
}))

app.get('/', (req: Request, res: Response) => {
  
    res.status(200).json({
        "message": "Express Server",
        "author": "Next Lavel"
    })
})


app.use("/api/users", userRoute)

app.use("/api/profiles", profileRoute)
app.use("/api/auth",authRouter)


app.use(globalErrorHandler);

export default app