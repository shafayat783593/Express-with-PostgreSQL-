// server.ts / main.ts
import dotenv from "dotenv"
dotenv.config() 
import app from "./app"
import { initDB } from "./db"

const port = process.env.PORT || 5000

const main = async () => {
    await initDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()