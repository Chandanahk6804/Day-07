const mysql = require('mysql2');
const CustomError = require('./error-class');
require('dotenv').config();

let pool;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit:process.env.CONNECTION_LIMIT
}

// To create and send a pool if not exists 
const getPool = () => {
    if(!pool) {
        pool = mysql.createPool(dbConfig)
    }
    return pool.promise()
}

// Function to execute queries using pool
const executeQuery = async (query, queryParams =[]) => {
    try {
        const p = getPool();
        const [result] = await p.execute(query, queryParams);
        return result;
    }
     catch (err) {
        throw new CustomError(
            500, 
            err|| "Database operation failed",
            "DatabaseError"
        )
     }   
}

// Function to begin transaction 
const startTransaction = async (func) => {
    const p = getPool();
    const con = await p.getConnection();
    
    try {
        await con.beginTransaction();
        const result = await func(con); 
        await con.commit();
        return result;
    } catch (err) {
        await con.rollback();
        throw new CustomError(
            500,
            err.sqlMessage || "Transaction failed",
            "DatabaseError"
        );
    } finally {
        con.release(); 
    }
};

module.exports = {executeQuery, startTransaction}