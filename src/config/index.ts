import dotenv from "dotenv"
import path from "path"
dotenv.config({
    path:path.join(process.cwd(),".env")
})

const config = {
    connection_string: process.env.CONNECTION_STRING,
    port: process.env.PORT || 5000,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
    access_token_expire: process.env.ACCESS_TOKEN_EXPIRE_TIME ,
    refresh_token_expire: process.env.REFRESH_TOKEN_EXPIRE_TIME 
}

export default config