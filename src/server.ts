// server.ts / main.ts

import app from "./app"
import config from "./config"
import { initDB } from "./db"

// const port = process.env.PORT || 5000

const main = async () => {
    await initDB()
    app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
    })
}

main()