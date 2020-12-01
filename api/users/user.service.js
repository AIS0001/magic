const pool = require("../../config/database");

module.exports = {
    
    create:(data,pwd,uid,level,callback)=>{
       // console.log(uid);
        pool.query(
            `INSERT INTO user_registration ( userid, password, cname, contact, email, state, city, address, pincode, date, empcode, refcode, cardno, amount, payment_mode,level,type)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [   
            uid, 
            pwd,
            data.cname,
            data.contact,
            data.email,
            data.state,
            data.city,
            data.address,
            data.pincode,
            data.date,
            data.empcode,
            data.refcode,
            data.cardno,
            data.amount,
            data.payment_mode,
            level,
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
          
        ` INSERT INTO sub_id_registration (empid,userid, cardno, date) 
        VALUES (?, ?,?, ?);`,
   [
    data.empcode,
    uid,
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
    insertCompanyWallet:(userid,usrtype,uamount,dte,remark,callback)=>{
        pool.query(
            `INSERT INTO company_wallet ( userid, type, amount,dte, remark) VALUES (?, ?, ?,?, ?);`,
        [
            userid,
            usrtype,
            uamount,
            dte,
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
    checkkycDetailsExists:(uid,callback)=>{
        pool.query(`SELECT count(*) as cnt FROM kyc where userid=?  `,
        [uid ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    }, 
    getkycDetails:(uid,callback)=>{
        pool.query(`SELECT * FROM kyc where userid=?  `,
        [uid ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    },
    getsponsorLevel:(refid,callback)=>{
        pool.query(`SELECT level FROM user_registration where userid=?  `,
        [refid ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    },
     getUserIdByLevel:(level,callback)=>{
        pool.query(`SELECT * FROM user_registration where level=?  `,
        [level ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
    },
    insertKyc:(data,callback)=>{
        pool.query(
            `INSERT INTO kyc (userid, name, bank, branch, account, ifsc, pan, adhaar)
             VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            data.userid,
            data.name,
            data.bank,
            data.branch,
            data.account,
            data.ifsc,
            data.pan,
            data.adhaar,

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
    insertlevelincome:(data,pid,uid,amount,callback)=>{
        pool.query(
            `INSERT INTO level_income ( parent_id, child_id, amount, createddate) 
            VALUES ( ?, ?, ?, ?);`,
        [
            pid,
            uid,
            amount,
            data.date,
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
    updateKyc:(data,callback)=>{
        pool.query(
            `UPDATE kyc SET name = ?, bank = ?, branch = ?,
             account = ?, ifsc = ?, pan = ?, adhaar = ? WHERE kyc.userid = ?;`,
        [
            
            data.name,
            data.bank,
            data.branch,
            data.account,
            data.ifsc,
            data.pan,
            data.adhaar,
            data.userid,

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
    insertEmployeeWallet:(userid,empid,refid,uamount,dte1,remark,callback)=>{
        pool.query(
            `INSERT INTO employee_wallet ( userid, empid,refid, amount,dte, remark) VALUES (?, ?,?, ? , ?, ?);`,
        [
            userid,
            empid,
            refid,
            uamount,
            dte1,
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
    insertCartItems:(data,callback)=>{
        pool.query(
            `INSERT INTO cart (userid, vendorid, item_name, item_code, cat_name, cat_id, qty,unit, price, amount, created_date, flag)
             VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '1');`,
        [
            data.userid,
            data.vendorid,
            data.item_name,
            data.item_code,
            data.cat_name,
            data.cat_id,
            data.qty,
            data.unit,
            data.price,
            data.amount,
            data.created_date

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
    getcartItemsbyUserid:(data,callback)=>{
        pool.query(`SELECT * FROM cart where userid=? AND flag='1' `,
        [ data.userid ],
        (error,results,fields)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        } );
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
    InsertcashBackIncome:(uid,amount,dte ,callback)=>{
        //check user type
       pool.query( `INSERT INTO cashback (userid, amount, date) VALUES ( ?, ?, ?) `,
           [
               uid,
               amount,
               dte
               
               
           ]
                );
        
    },
   

    InsertProfile:(data,callback)=>{
        //check user type
       pool.query( `INSERT INTO cashback (userid, amount, date) VALUES ( ?, ?, ?) `,
           [
            data.userid,
            data.vendorid,
            data.item_name,
            data.item_code,
            data.cat_name,
               
           ]
                );
        
    },
    refIncome:(refamount,usertype,uid,dte,callback)=>{
        //check user type
       if(usertype=="user")
        {
            pool.query( `INSERT INTO ref_income (userid, amount, date) VALUES ( ?, ?, ?);`,
           [
               uid,
               refamount,
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
    getVendorByCategory:(data,callback)=>{
        pool.query(`SELECT user_registration.cname, user_registration.userid, user_registration.city,
         user_registration.address, user_registration.pincode FROM user_registration INNER JOIN products ON user_registration.userid=products.vendorid 
        WHERE user_registration.type = 'vendors'AND products.cat_name LIKE ?`,
        [ data.category ],
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
    getAllEmployee:callback=>{
        pool.query(`select * from user_registration where type="employee"`,
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
    getPoolUsers:(empid,lmt,ofset,callback)=>{
        pool.query(`select * from sub_id_registration where empid=? AND status="1" limit ? offset ?`,
        [
        empid,
        lmt,
        ofset
        ],
        (error,results,fiels)=>{
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
    getProductByid:(data,callback)=>{
        // console.log(data.userid);
         pool.query(`select * from products where prod_id=?`,
         [data.pid],
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
    getTotalEmployee:(callback)=>{
        pool.query(`select count(*) as total_emp from user_registration `,
        [],
        (error,results,fiels)=>{
            if(error)
            {
              return  callback(error);
            }
            return callback(null,results);
        });
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
        pool.query(`select max(level) as level from user_registration `,
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

    updateUsers:(data,callback)=>{
        pool.query(`update user_registration set cname=?,city=?,address=?,pincode=?,contact=? where userid=?`,
        [
            data.cname,
            data.city,
            data.address,
            data.pincode,
            data.contact,
            data.userid
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
    updatePassword:(data,callback)=>{
        pool.query(`update user_registration set password=? where userid=?`,
        [
            data.password,
            data.userid
        ],
        (error,results,fields)=>{
            if(error)
            {
              return  callack(error);
            }
            return callback(null,results);
        });
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