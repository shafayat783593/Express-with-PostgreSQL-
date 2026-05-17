
import dotenv from "dotenv"
dotenv.config()
import { Pool } from "pg"
const database = process.env.CONNECTION_STRING

 export const pool = new Pool({
    // connectionString: config.connectin_string
    connectionString:database
})

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(200),
            email VARCHAR(300) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            is_active BOOLEAN DEFAULT true ,
            age INT,
            role VARCHAR(200) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at  TIMESTAMP DEFAULT NOW()
               )
            `)
        
        
        await pool.query(
            ` CREATE TABLE IF NOT EXISTS profiles(
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
            bio TEXT,
            address VARCHAR(300),
            phone VARCHAR(20),
            gender VARCHAR(20),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at  TIMESTAMP DEFAULT NOW()
            )
            
            `
        )
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}

