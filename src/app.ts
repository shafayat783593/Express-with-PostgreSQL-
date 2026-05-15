import express, { request, type Application, type Request, type Response } from "express"
// import config from "./config"

import {  pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/user/profile/profile.route"
const app: Application = express()



app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))



app.get('/', (req: Request, res: Response) => {
  
    res.status(200).json({
        "message": "Express Server",
        "author": "Next Lavel"
    })
})


app.use("/api/users", userRoute)

app.use("/api/profiles", profileRoute)



export default app