const pool = require("../../config/database");

module.exports = {
    create:(data,callback)=>{
        pool.query(
            `INSERT INTO emp_registration (userid, password, empname, contact, city, address, pincode, date, status, flag)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, '1', '1')`,
        [
            data.userid,
            data.password,
            data.empname,
            data.contact,
            data.city,
            data.address,
            data.pincode,
            data.date,
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
    createCategory:(data,callback)=>{
        pool.query(
            `INSERT INTO category (userid, cat_name, flag)
             VALUES (?, ?, '1')`,
        [
            data.userid,
            data.cat_name,
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
        pool.query(`select * from user_registration where type="user"`,
        [ ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },
    getVendorsmodel:callback=>{
        pool.query(`select * from user_registration where type="vendors"`,
        [ ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },
    getEmployee:callback=>{
        pool.query(`select * from user_registration where type="employee"`,
        [ ],
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
        pool.query(`select * from emp_registration where userid=?`,
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