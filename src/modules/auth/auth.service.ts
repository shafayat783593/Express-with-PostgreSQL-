
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { Iauth } from "./auth.interface";
import jwt from "jsonwebtoken"
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
    console.log(mathchPassword)
    if (!mathchPassword) {
        throw new Error("Invalid Credentilas !")

    }
    // generate token
    const jwtpayload = {
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email

    }

    const secretToken = process.env.JWT_Token
    const accessToken = jwt.sign(jwtpayload, secretToken as string, { expiresIn: "1d" })
    return { accessToken }

}