const mysql = require('mysql2');

require('dotenv').config();
const { 
    PORT, HOST, DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASS, 
    HB_HOST, HB_PORT, HB_PATH
} = process.env;

const dbpool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
});

const hookOpt = {
    hostname: HB_HOST,
    port: HB_PORT,
    path: HB_PATH,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        // "Content-Length": data.length
    }
};

module.exports = {
    host: HOST,
    port: PORT,
    dbConn: dbpool,
    hbOpt: hookOpt,
    hbHostOpt: HB_HOST,
    hbPortOpt: HB_PORT,
    hbPathOpt: HB_PATH,
};