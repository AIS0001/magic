//require('dotenv').config();
const {createPool } = require('mysql');
const pool = createPool({
   /* port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.MYSQL_DB,
    connectionLimit:10*/
   /* port:3306,
    host:"localhost",
    user:"root",
    password:"Realforce@123",
    database:"magic_nasty",
    connectionLimit:10*/

    host:"aisgroup.in",
    user:"aisgr1bu_user1",
    password:"Realforce__123",
    database:"aisgr1bu_magic_nasty",
   // database:"aisgr1bu_magic_nasty_test",
    connectionLimit:10
});

module.exports = pool;