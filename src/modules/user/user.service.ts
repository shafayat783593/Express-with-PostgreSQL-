import { pool } from "../../db"
import type { IUser } from "./user.interface"
import bcrypt from "bcryptjs";

export const createUserIntoDB = async (payload: IUser) => {
    const { name, email, age, password } = payload
    const hashPassword = await bcrypt.hash(password, 12);

      const result = await pool.query(`
        INSERT INTO users(name, email, age, password) VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, age, hashPassword])
delete result.rows[0].password
     return result
}

export const getAllUserFromDB = async () => {
     const result = await pool.query(
            `
            SELECT *FROM users
            `
    )

    const usersWithoutPassword = result.rows.map(({ password, ...user }) => user);

    return usersWithoutPassword
}

export const getsingleUserFromDB = async (id:string) => {
       const result = await pool.query(`
            SELECT * FROM users WHERE  id=$1
    `, [id]
       )

    const { password, ...userWithoutPassword } = result.rows[0];
         
    console.log(userWithoutPassword)
        return userWithoutPassword
}


export const updateUserIntoDB = async (paylode:IUser,id:string) => {

    const {name, password, age, is_active, }=paylode
       const result = await pool.query(

            `
UPDATE users
SET
 name=COALESCE($1, name),
  password=COALESCE($2, password),
   age=COALESCE($3, age),
   is_active=COALESCE($4, is_active)

WHERE id=$5  RETURNING * 
        `
           , [name, password, age, is_active, id])
    
    return result
}


export const deleteUserFromDB = async(id:string) => {
     const result = await pool.query(
            `
            DELETE FROM users WHERE id=$1
            `
         , [id])
    
    return result
}