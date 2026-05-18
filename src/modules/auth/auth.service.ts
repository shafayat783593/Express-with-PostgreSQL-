
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { Iauth } from "./auth.interface";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../../config";
export const loginIntoDB = async (payload: Iauth) => {
    const { email, password } = payload

    const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `
        , [email])
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentilas !")

    }
    const user = userData.rows[0]

    const mathchPassword = await bcrypt.compare(password, user.password)

    if (!mathchPassword) {
        throw new Error("Invalid Credentilas !")

    }
    // generate token
    const jwtpayload = {
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email,
        role: user.role
    }


    const accessToken = jwt.sign(jwtpayload, config.jwt_access_token as string, { expiresIn: "15m" })
    const refreshToken = jwt.sign(jwtpayload, config.jwt_refresh_token as string, { expiresIn: "7d" })
    return { accessToken, refreshToken }

}


export const generateRefreshToken = async (token: string) => {



    if (!token) {
        throw new Error("Unauthorized access !")
    }

    //verify the token
    const decoded = jwt.verify(token as string, config.jwt_refresh_token as string) as JwtPayload
    // find ther user into database
    const userData = await pool.query(
        `
         SELECT * FROM users WHERE email=$1
                `
        , [decoded.email])
    const user = userData.rows[0]

    if (!user) {
        throw new Error("User not found")
    }
    if (!user.is_active) {
        throw new Error("Forbidden !")
    }

    const jwtpayload = {
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email,
        role: user.role

    }
    const accessToken = jwt.sign(jwtpayload, config.jwt_access_token as string, { expiresIn: "15m" })

    return accessToken
}