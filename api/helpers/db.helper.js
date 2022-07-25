const { Pool, Client } = require("pg");

// Connect with a pool.
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

pool.connect();
// pool.query('SELECT NOW()', (err, res) => {
//     if(err){
//         console.log(err, res);
//     }
//     else{
//         console.log("Database connected");
//     }
//     // pool.end()
// });

// pool.end();

module.exports = pool;