const { create,getUsers,getUserByid,
    viewCategory,
    createCategory,
    getVendorsmodel,
    getCompanyWallet,
    activateUser,
    
    getEmployee,
    updateUser,
    deleteUser, 
    getUserByuserEmail } = require("./admin.service");
const { genSaltSync,hashSync,compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports ={

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
                    message:err
                });
            }
            return res.status(200).json({
                success:1,
                data:results

            });

        });
    },
    viewIncomeByDate:(req,res)=>{
        const body = req.body;
        getCompanyWallet(body,(err,results)=>{
            if(err)
            {
                return res.json({
                    status:500,
                    success:0,
                    message:err
                });
            }
            if(!results)
            {
                return res.json({
                    status:401,
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                status:200,
                success:1,
                data:results 
            });
        });
    },
    viewIncome:(req,res)=>{
        const body = req.body;
        getCompanyWallet(body,(err,results)=>{
            if(err)
            {
                return res.json({
                    status:500,
                    success:0,
                    message:err
                });
            }
            if(!results)
            {
                return res.json({
                    status:401,
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                status:200,
                success:1,
                data:results 
            });
        });
    },
    userActivate:(req, res) => {
        const body = req.body;
        activateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    status: 500,
                    success: 0,
                    data: err
                });
            }
            return res.json({
                status: 200,
                success: 1,
                data: "Record updates successfully"
            });
        });

    },
    insertCategory:(req,res)=>{
        let gallary = '';
        req.files['gallary'].forEach(el => {
         gallary += el.filename + ',';
        });
        gallary = gallary.substring(0, gallary.length - 1);

        const body =req.body;
        
        createCategory({  
            userid: req.body.userid,
            cat_name: req.body.cat_name, 
            gallary: gallary
            
        },(err,results)=>{

            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            return res.status(200).json({
                status:200,
                success:1,
                data:results

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
    },//where?!
    //this one used for getting image and other data
    viewCategories:(req,res)=>{
        viewCategory((err,results)=>{
            if(err)
            {
                return res.json({
                    status:500,
                    success:0,
                    message:err
                });
            }
            if(!results)
            {
                return res.json({
                    status:401,
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                status:200,
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
                    status:401,
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                status:200,
                success:1,
                data:results 
            });
        });
    },
    getVendors:(req,res)=>{
        getVendorsmodel((err,results)=>{
            if(err)
            {
                console.log(err);
                return res.json({
                    status:403,
                    success:0,
                    message:err
                });
            }
            if(!results)
            {
                return res.json({
                    status:401,
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                status:200,
                success:1,
                data:results 
            });
        });
    },
    getEmployees:(req,res)=>{
        getEmployee((err,results)=>{
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
                    message:"Record not found"
                });
            }
            return res.json({
                status:200,
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
        getUserByuserEmail(body.email,(err,results)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            if(!results)
            {
               return res.json({
                success:0,
                data:"Invalid Email or Password"

               }) ;
          
            }
            const result = compareSync(body.password,results.password);
            if(result)
            {
                results.password=undefined;
                const jwt = sign({result,results},process.env.SECRET_KEY,{
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