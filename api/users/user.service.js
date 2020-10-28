const pool = require("../../config/database");

module.exports = {
    create:(data,pwd,callback)=>{
       
        var uid = Math.floor(Math.random() * 100000) ;
        //console.log(pwd);
        pool.query(
            `INSERT INTO user_registration ( userid, password, cname, contact, city, address, pincode, date, empcode, refcode, cardno, payment_mode,type)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)`,
        [   
            uid, 
            pwd,
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
    insertCategory:(data,callback)=>{
        pool.query(         
            `INSERT INTO category(userid,cat_name)VALUES(?, ?);`,
        [
            data.userid,
            data.cat_name
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
    insertCompanyWallet:(userid,usrtype,uamount,remark,callback)=>{
        pool.query(
            `INSERT INTO company_wallet ( userid, type, amount, remark) VALUES (?, ?, ?, ?);`,
        [
            userid,
            usrtype,
            uamount,
            remark  
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
    insertEmployeeWallet:(userid,empid,uamount,remark,callback)=>{
        pool.query(
            `INSERT INTO employee_wallet ( userid, empid, amount, remark) VALUES (?, ?, ?, ?);`,
        [
            userid,
            empid,
            uamount,
            remark  
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
    },
    cashBackIncome:(uid,amount,dte,lmt,ofset ,callback)=>{
        //check user type
       if(usertype=="user")
        {
            pool.query( `INSERT INTO cashback (userid, amount, date) VALUES ( ?, ?, ?) limit ? OFFSET ? `,
           [
               uid,
               amount,
               dte,
               lmt,
               ofset
           ]
                );
        }
        
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
    getUsersByToken:(auth_token,callback)=>{
        pool.query(`SELECT *  FROM active_token where token= ? `,
        [ auth_token],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    },
    directdownline:(data,callback)=>{
        pool.query(`SELECT cname,contact,address,date FROM user_registration where refcode=?`,
        [ data.userid ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
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
    getRefIncomeByUserId:(data,callback)=>{
        pool.query(`SELECT * FROM ref_income where userid=? `,
        [ data.userid ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    },
    getcashbackIncomeByUserId:(data,callback)=>{
        pool.query(`SELECT * FROM cashback where userid=? `,
        [ data.userid ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    },
    
            // sum of refferal Income
    getTotalRefIncome:(data,callback)=>{
                pool.query(`SELECT IFNULL(sum(amount),0) as amount FROM ref_income where userid=? `,
                [ data.userid ],
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

    getUserByid:(data,callback)=>{
       // console.log(data.userid);
        pool.query(`select * from user_registration where userid=?`,
        [data.userid],
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