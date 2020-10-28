const { create,getUsersByToken,directdownline,insertCategory,getcashbackIncomeByUserId,insertEmployeeWallet,getMaxLevel,getTotalUserByempId,insertCompanyWallet,getTotalRefIncome,refIncome,getRefIncomeByUserId,getUsersByEmpID,insertToken,getUsers,getUserByid,updateUser,deleteUser, getUserByuserEmail } = require("./user.service");
const { genSaltSync,hashSync,compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
//const { CreateToken } = require("./token.middleware");
module.exports ={
    maxlevel:(req,res)=>{

        getMaxLevel((err,results)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!results)
            {
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                level_result:results 
            });
        });
    },
    referralIncome:(req,res)=>{
        const body = req.body;
        //console.log(uid);
        getRefIncomeByUserId(body,(err,income)=>{
           
            if(err)
            {
                console.log(err);
                return;
            }
            if(!income)
            {
                return res.status(404).json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                data:income 
            });
        });
    },
    cashBackIncome:(req,res)=>{
        const body = req.body;
        //console.log(uid);
        getcashbackIncomeByUserId(body,(err,income)=>{
           
            if(err)
            {
                console.log(err);
                return;
            }
            if(!income)
            {
                return res.status(404).json({
                    status:404,
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                data:income 
            });
        });
    },
    //Total ref Income
    totalRefIncome:(req,res)=>{
        const body = req.body;
        
        getTotalRefIncome(body,(err,total_income)=>{
            if(err)
            {
                console.log(err);
                return res.status(404).json({
                    status:503,
                    success:0,
                    message:err
                });
            }
            if(!total_income)
            {
                return res.status(404).json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                data:total_income 
            });
        });
    },
    addCategory:(req,res)=>{
        const body = req.body;
        insertCategory(body,(err,results)=>{
            if(err)
            {
                console.log(err);
             //    console.log(body);
                return res.status(500).json({
                    status:500,
                    success:0,
                    message:"500 Internal Server Error"
                });
            }
            //console.log(body);
         return res.status(200).json({
                // console.log(pool1Amount);
                status:200,
                 success:1,
                 status:200
             });
        });
        
    },

    createUser:(req,res)=>{

        const body =req.body;
        const salt = genSaltSync(10);
        const empid = body.empcode;
        var uid = Math.floor(Math.random() * 100000) ;
        //console.log(uid);
        //body.password=hashSync(body.password,salt);
        var password = "welcome@123" ;
        password=hashSync(password,salt);
          //get total cashBack user list
          getUsersByEmpID(empid,(err,useremp)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!useremp)
            {
                return res.status(404).json({
                    success:0,
                    message:"Unable to get Total user record by empid"
                });
            }
           /*return res.status(200).json({
               // console.log(pool1Amount);
                success:1,
                data:useremp
                
            });*/
        });

       
     getTotalUserByempId(empid,(err,tusers)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!tusers)
            {
                return res.json({
                    success:0,
                    message:"Unable to get Total user record by empid"
                });
            }
           /*return res.json({
               // console.log(pool1Amount);
                success:1,
                //data:results,
                users:tusers 
            });*/
        });
      //////////////////////
       const cardAmount = 500;
       const companyShare = cardAmount*0.40;
       const empShare = cardAmount*0.20;
       const remainAmount = cardAmount-(companyShare+empShare);
      
       const pool1Amount = remainAmount*0.40;
       const pool2Amount = remainAmount*0.30;
       const pool3Amount = remainAmount*0.20;
       const pool4Amount = remainAmount*0.10;
       const poolwiseUsers =Math.round(15*0.25);
       const poll1UserAmount = pool1Amount/poolwiseUsers;
       const poll2UserAmount = pool2Amount/poolwiseUsers;
       const poll3UserAmount = pool3Amount/poolwiseUsers;
       const poll4UserAmount = pool4Amount/poolwiseUsers;
       //console.log(pool1Amount);
      
               //pool amount distribution
           ///////////////////
          
           const  poolDatas= {
              "pool1":poll1UserAmount,
              "pool2":poll2UserAmount,
              "pool3":poll3UserAmount,
              "pool4":poll4UserAmount
          }
          
          const usertype = body.type;
         // console.log(usertype);
          const refid = body.refcode;
         // console.log(uid);
          const dte = body.date;
          const usertype1 = body.type;
       //  console.log(usertype1);
          if(refid!="0")
          {
            refIncome(poll1UserAmount,usertype,refid,dte,(err,companywallet)=>{
                if(err)
                {
                    console.log(err);
                    return;
                }
                if(!poolDataresults)
                {
                    return res.json({
                        success:0,
                        message:"Something in pool /cashback data calculation"
                    });
                }
              
                
            });
          
          }
         // console.log(usertype);
         var uremark = ""
         var eremark = "ESC"

          if(usertype1=="user")
          {
             uremark = "User account activation fee";
             insertCompanyWallet(uid,usertype,companyShare,uremark,(err,results)=>{
                if(err)
                {
                    console.log(err);
                 //    console.log(body);
                    return res.status(500).json({
                        status:500,
                        success:0,
                        message:"500 Internal Server Error"
                    });
                }
                //console.log(body);
               /* return res.status(200).json({
                    // console.log(pool1Amount);
                     success:1,
                     status:200
                 });*/
            });
            insertEmployeeWallet(uid,body.empcode,empShare,uremark,(err,results)=>{
                if(err)
                {
                    console.log(err);
                 //    console.log(body);
                    return res.status(500).json({
                        status:500,
                        success:0,
                        message:"500 Internal Server Error"
                    });
                }
                //console.log(body);
               /* return res.status(200).json({
                    // console.log(pool1Amount);
                     success:1,
                     status:200
                 });*/
            });
           //Cash Back Income
           /* while(poolwiseUsers>=1)
            {
                cashBackIncome(body.userid,companyShare,dte,poolwiseUsers,poolwiseUsers,(err,results)=>{
                    if(err)
                    {
                        console.log(err);
                        return;
                    }
                    if(!poolDataresults)
                    {
                        return res.json({
                            success:0,
                            message:"Something in pool /cashback data calculation"
                        });
                    }
                });
                poolwiseUsers--;
            }*/
            //Cash abck income end
            
          }
          else  if(usertype1=="vendor")
          {
            uremark = "Vendor  fee";
          }
          else  if(usertype1=="employee")
          {
            uremark = "Employee Fee  Activated";

          }
          else{
               uremark = "";
          }
         // res.end();
         create(body,password,uid,(err,results)=>{
            if(err)
            {
                console.log(err);
             //    console.log(body);
                return res.status(500).json({
                    status:500,
                    success:0,
                    message:"500 Internal Server Error create"
                });
            }
            //console.log(body);
           return res.status(200).json({
                // console.log(pool1Amount);
                 success:1,
                 status:200
             });
        });
        //get employee id by cardno
     
    },
    //on referesh get user token details
    userToken:(req,res)=>{
        const body = req.header("auth_token");
       // console.log(body);
       // const tokenresult=[ ];
      const tkn = body
        getUsersByToken(tkn ,(err,tokenresult)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!tokenresult)
            {
                return res.json({
                    status:401,
                    tkn:tkn,
                    success:0,
                    message:"Record not found",
                   
                });
            }
           //console.log(tokenresult[0]);
            getUserByid( tokenresult[0] ,(err,results)=>{
                if(err)
                {
                    console.log(err);
                    return;
                }
                if(!results)
                {
                    return res.json({
                        status:401,
                        success:0,
                        message:"Record not found",
                       
                    });
                }
                return res.json({
                    status:200,
                    success:1,
                    token:tokenresult[0].token,
                    data:results 
                });
            })
          //console.log(tokenresult[0].userid);
           /*tokenresult && tokenresult.map((test)=>{
               console.log(test);
           }
           )*/
       
        })
    },
    //Direct refferal
    directDownlineMembers:(req,res)=>{
        const body = req.body;
        
        directdownline(body,(err,results)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!results)
            {
                return res.json({
                    status:401,
                    success:0,
                    message:"Record not found",
                   
                });
            }
            console.log(results);
            return res.json({
                status:200,
                success:1,
                data:results 
            });
        });
    },

    getUserByid:(req,res)=>{
        const body = req.body;
        getUserByid(body,(err,results)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!results)
            {
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                data:results 
            });
        });
    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!results)
            {
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                data:results 
            });
        });
    },
    
    updateUser:(req,res)=>{
        const body =req.body;
        const salt = genSaltSync(10);
        body.password=hashSync(body.password,salt);
        updateUser(body,(err,results)=>{
            if(err)
            {
               console.log(err);
               return;
            }
            return res.json({
                success:1,
                data:"Record updates successfully"
            });
        });


    },

    deleteUser:(req,res)=>{
       // const id = req.param.id;
       const data = req.body;
        deleteUser(data,(err,results)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!results)
            {
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                message:"Record deleted successfully"
            })
        });

    },

    login:(req,res)=>{
        const body = req.body;
        getUserByuserEmail(body.userid,(err,results)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!results)
            {
               return res.json({
                success:0,
                data:"Invalid userid or Password"

               }) ;
          
            }
            const result = compareSync(body.password,results.password);
            if(result)
            {
                results.password=undefined;
                const jwt = sign({result,results},"TXlMb3ZlUHJpeWFua2E=",{
                    expiresIn:"1h"
                });
                 
                insertToken(body.userid,jwt,(err,results)=>{
                    if(err)
                    {
                        console.log(err);
                        return res.status(500).json({
                            status:500,
                            success:0,
                            message:"500 Internal Server Error"
                        });
                    }
                })
                return res.status(200).json({
                    success:1,
                    message:"logged in successfully",
                    data:results,
                    status:200,
                    token:jwt
                })
                
              

            }
            else{
                return res.jason({
                    success:0,
                    message:"Invalid email or password"
                });

            }
        });
    }


}