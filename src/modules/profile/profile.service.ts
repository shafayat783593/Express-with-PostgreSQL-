import { pool } from "../../db"

export const createProfileIntoDB = async (paylode:any) => {
    const { user_id, bio, address, phone, gender } = paylode
    
    // first check if ther user is exists
    const user = await pool.query(
        `
        SELECT * FROM users WHERE id=$1
        `
        , [user_id])

    if (user.rows.length === 0) {
        throw new Error("user not exists !");
        
    }

    const result = await pool.query(
        `INSERT INTO profiles(user_id, bio, address, phone, gender ) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `
    ,[user_id, bio, address, phone, gender ])
return result
}