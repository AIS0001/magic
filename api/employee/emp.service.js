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

    createProduct:(data,callback)=>{
        pool.query(
            `INSERT INTO products ( userid, vendorid, cat_name, prod_id, prod_name, price, description, gallary, flag) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, '1');`,
        [
            data.userid,
            data.vendorid,
            data.cat_name,
            data.prod_id,
            data.prod_name,
            data.price,
            data.desc,
            data.gallary
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
    viewProductsByVendorid:(data,callback)=>{
        pool.query(`select * from products where vendorid=?`,
        [data.vendorid],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },
    getUsers:callback=>{
        pool.query(`select * from emp_registration`,
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

    getUserByid:(data,callback)=>{
        pool.query(`select * from users where userid=?`,
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
    getUserByid:(data,callback)=>{
        pool.query(`select * from users where userid=?`,
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

    getUserByEmpid:(data,callback)=>{
        pool.query(`select * from user_registration where empcode=? AND type= 'user'`,
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
    getVendorByEmpid:(data,callback)=>{
        pool.query(`select * from user_registration where empcode=? AND type= 'vendors'`,
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
    getEmployeeWallet:(data,callback)=>{
        pool.query(`SELECT * FROM employee_wallet where empid=? `,
        [data.empid],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },
    directIncome:(data,callback)=>{
        pool.query(`SELECT * FROM employee_wallet where empid=? AND refid='0' `,
        [data.empid],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    }, 
    indirectIncome:(data,callback)=>{
        pool.query(`SELECT * FROM employee_wallet where empid=? AND refid=? `,
        [
            data.empid,
            data.refid
        
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