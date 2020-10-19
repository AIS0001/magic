const { create,getMaxLevel,getUserByempId,getCurrentUserEmpId,getUsers,getUserByid,updateUser,deleteUser, getUserByuserEmail } = require("./user.service");
const { genSaltSync,hashSync,compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
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
    createUser:(req,res)=>{

        const body =req.body;
        const salt = genSaltSync(10);
        body.password=hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error ahoooo"
                });
            }
          
        });
//get employee id by cardno

  const empid = body.empcode;
        getUserByempId(empid,(err,tusers)=>{
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
         //   console.log(res.get(tusers));
            //Pool Amount Distribution
            const cardAmount = 500;
            const pool1Amount = cardAmount*0.40;
            const pool2Amount = cardAmount*0.30;
            const pool3Amount = cardAmount*0.25;
            const pool4Amount = cardAmount*0.15;
            const poolwiseUsers =tusers.total_users*0.25; 
            //pool amount distribution
            return res.json({
               // console.log(pool1Amount);
                success:1,
                pool1Amount:pool1Amount,
                pool2Amount:pool2Amount,
                pool3Amount:pool3Amount,
                pool4Amount:pool4Amount,
                poolwiseUsers:poolwiseUsers,
                //data:results,
                users:tusers 


            });
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
                return res.json({
                    success:1,
                    message:"logged in successfully",
                    token:jwt
                });
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