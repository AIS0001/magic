const pool = require("../../config/database");

module.exports = {
    create:(data,callback)=>{
        pool.query(
            `INSERT INTO user_registration ( userid, password, cname, contact, city, address, pincode, date, empcode, refcode, cardno, payment_mode,type)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)`,
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
            data.type,
        ],
    
        (error,results,fields)=>{
            if(error)
            {
                return callback(error);
            }
            return callback(null,results);
        }

        );
        pool.query(
          
        ` INSERT INTO sub_id_registration (userid,empid, cardno, date) 
        VALUES (?, ?,?, ?);`,
   [
       data.userid,
       data.empcode,
       data.cardno,
       data.date
   ]

        );
    },
    insertToken:(userid,data,callback)=>{
        pool.query(
            `INSERT INTO active_token (userid, token) VALUES (?, ?);`,
        [
            userid,
             data  
        ],
    
        (error,results,fields)=>{
            if(error)
            {
                return callback(error);
            }
            return callback(null,results);
        }
        );
        pool.query(
          
        ` INSERT INTO sub_id_registration (userid,empid, cardno, date) 
        VALUES (?, ?,?, ?);`,
   [
       data.userid,
       data.empcode,
       data.cardno,
       data.date
   ]
        );
        
    },


    refIncome:(poolData,usertype,uid,dte,callback)=>{
        //check user type
       if(usertype=="user")
        {
            pool.query( `INSERT INTO ref_income (userid, amount, date) VALUES ( ?, ?, ?);`,
           [
               uid,
               poolData,
               dte
           ]
                );
        }
        
    },

    getUsersByEmpID:(id,callback)=>{
        pool.query(`SELECT userid FROM sub_id_registration where empid=? AND status='1' `,
        [ id ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    },

        //get referral income by user id
    getRefIncomeByUserId:(uid,callback)=>{
        pool.query(`SELECT * FROM ref_income where userid=? `,
        [ uid ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    },

            // sum of refferal Income
      getTotalRefIncome:(uid,callback)=>{
                pool.query(`SELECT IFNULL(sum(amount),0) as amount FROM ref_income where userid=? `,
                [ uid ],
                (error,results,fields)=>{
                    if(error)
                    {
                      return  callback(error);
                    }
                    return callback(null,results);
                } );
            },
    getUsers:callback=>{
        pool.query(`select * from user_registration`,
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
        pool.query(`select * from user_registration where userid=?`,
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
    getTotalUserByempId:(empid,callback)=>{
        pool.query(`select count(*) as total_users from sub_id_registration where empid=? `,
        [empid],
        (error,results,fiels)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },
    getCurrentUserEmpId:(cardno,callback)=>{
        pool.query(`select empid from sub_id_registration where cardno=?`,
        [cardno],
        (error,results,fiels)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        }
        );
    },

    getMaxLevel:(callback)=>{
        pool.query(`select max(id) as id from sub_id_registration `,
        [],
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
        pool.query(`update user_registration set fname=?,lname-?,gender=?,email=?,password=?,contact=? where id=?`,
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
        pool.query(`delete from user_registration where id=?`,
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
            `select * from user_registration where userid = ?`,
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