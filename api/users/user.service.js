const pool = require("../../config/database");

module.exports = {
    create:(data,callback)=>{
        pool.query(
            `INSERT INTO user_registration ( userid, password, cname, contact, city, address, pincode, date, empcode, refcode, cardno, payment_mode, status, flag)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)`,
        [
            data.userid,
            data.password,
            data.cname,
            data.contact,
            data.city,
            data.address,
            data.pincode,
            data.date,
            data.empcode,
            data.refcode,
            data.cardno,
            data.payment_mode,
            data.status,
            data.flag,
        ],
        (error,results,fields)=>{
            if(error)
            {
                return callback(error);
            }
            return callback(null,results);
        }

        );
    },

    getUsers:callback=>{
        pool.query(`select * from registration`,
        [

        ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },

    getUserByid:(id,callback)=>{
        pool.query(`select * from registration where userid=?`,
        [id],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },

    updateUser:(data,callback)=>{
        pool.query(`update registration set fname=?,lname-?,gender=?,email=?,password=?,contact=? where id=?`,
        [
            data.fname,
            data.lname,
            data.gender,
            data.email,
            data.password,
            data.contact,
            data.id
        ],
        (error,results,fields)=>{
            if(error)
            {
              return  callack(error);
            }
            return callback(null,results);
        }
        );
    },
    deleteUser:(data,callback)=>{
        pool.query(`delete from registration where id=?`,
        [data.id],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },
    getUserByuserEmail:(email,callack)=>{
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error,results,fields)=>{
                if(error)
                {
                    callack(error);
                }
                return callack(null,results[0]);
            }
        );
    }

};