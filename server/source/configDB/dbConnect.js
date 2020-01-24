import pg from 'pg';

const databaseURL = 'postgresql://postgres:key07202020@localhost:5432/barefoot';
const pool = new pg.Pool({ connectionString: databaseURL });
if (pool) console.log("connected successfully to barefoot Database");


export default pool;
