import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new pg.Pool({ connectionString: process.env.databaseURL });
if (pool) console.log("connected successfully to barefoot Database");


export default pool;
