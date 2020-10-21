const { create,getMaxLevel,getTotalUserByempId,getTotalRefIncome,refIncome,getRefIncomeByUserId,getUsersByEmpID,insertToken,getUsers,getUserByid,updateUser,deleteUser, getUserByuserEmail } = require("./user.service");
const { genSaltSync,hashSync,compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { CreateToken } = require("./token.middleware");
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
        const uid = req.params.id;
        console.log(uid);
        getRefIncomeByUserId(uid,(err,income)=>{
           
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
    //Total ref Income
    totalRefIncome:(req,res)=>{
        const uid = req.params.id;
        
        getTotalRefIncome(uid,(err,total_income)=>{
            if(err)
            {
                console.log(err);
                return;
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
    
    createUser:(req,res)=>{

        const body =req.body;
        const salt = genSaltSync(10);
        const empid = body.empcode;
        //console.log(body.password);
        body.password=hashSync(body.password,salt);
          //get total cashBack user list
          getUsersByEmpID(empid,(err,results)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!results)
            {
                return res.status(404).json({
                    success:0,
                    message:"Unable to get Total user record by empid"
                });
            }
           return res.status(200).json({
               // console.log(pool1Amount);
                success:1,
                data:results
                
            });
        });

        create(body,(err,results)=>{
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
        //get employee id by cardno
     
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
         // console.log(dte);

          refIncome(poll1UserAmount,usertype,refid,dte,(err,poolDataresults)=>{
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
      
    
   
    },
    getUserByid:(req,res)=>{
        const id = req.param.id;
        getUserByid(id,(err,results)=>{
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