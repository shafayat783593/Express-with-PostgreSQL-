import express, { request } from "express";
import { Pool } from "pg";
// import config from "./config"
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
const database = process.env.CONNECTIONSRTING;
const pool = new Pool({
    // connectionString: config.connectin_string
    connectionString: database
});
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(200),
            email VARCHAR(300) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            is_active BOOLEAN DEFAULT true ,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at  TIMESTAMP DEFAULT NOW()
               )
            `);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(error);
    }
};
initDB();
app.get('/', (req, res) => {
    //   res.send('Hello World!')
    res.status(200).json({
        "message": "Express Server",
        "author": "Next Lavel"
    });
});
app.post("/api/user", async (req, res) => {
    console.log(req.body);
    const { name, email, age, password } = req.body;
    try {
        const result = await pool.query(`
        INSERT INTO users(name, email, age, password) VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, age, password]);
        // console.log(result.rows[0])
        res.status(201).json({
            message: "Created",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(201).json({
            message: error.message,
            error: error
        });
    }
});
app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *FROM users
            `);
        res.status(200).json({
            success: true,
            message: "Users retrived successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
app.get("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE  id=$1
    `, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users not found",
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            message: "Users retrived successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
app.put("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;
    try {
        const result = await pool.query(`
UPDATE users
SET
 name=COALESCE($1, name),
  password=COALESCE($2, password),
   age=COALESCE($3, age),
   is_active=COALESCE($4, is_active)

WHERE id=$5  RETURNING * 
        `, [name, password, age, is_active, id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users not found",
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            message: "Users updated successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
app.delete("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Users not found",
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            message: "Users delete successfully",
            data: {}
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=server.js.map