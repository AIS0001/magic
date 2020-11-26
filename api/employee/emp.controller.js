const { create,getUsers,viewProductsByVendorid,getEmployeeWallet,
    createProduct,getUserByid,getUserByEmpid,getVendorByEmpid,updateUser,deleteUser, getUserByuserEmail } = require("./emp.service");
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
                    status:401,
                    success:0,
                    message:"Database connection error ahoooo"
                });
            }
            return res.status(200).json({
                status:200,
                success:1,
                data:results

            });

        });
    },
    createProducts:(req,res)=>{

        const body =req.body;
        let gallary = '';
        req.files['gallary'].forEach(el => {
         gallary += el.filename + ',';
        });
        gallary = gallary.substring(0, gallary.length - 1);

        createProduct({
            userid: req.body.userid,
            vendorid: req.body.vendorid, 
            cat_name: req.body.cat_name, 
            prod_id: req.body.prod_id, 
            prod_name: req.body.prod_name, 
            price: req.body.price, 
            desc: req.body.desc, 
            gallary: gallary
        },(err,results)=>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    status:401,
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

    viewProductsByVendor:(req,res)=>{
        const body = req.body;
        viewProductsByVendorid(body,(err,results)=>{
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
        getEmployeeWallet(body,(err,results)=>{
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
        getEmployeeWallet(body,(err,results)=>{
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

    UserByid:(req,res)=>{
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
    UserByEmpid:(req,res)=>{
        const body = req.body;
        getUserByEmpid(body,(err,results)=>{
            if(err)
            {
                console.log(err);
                return res.json({
                    status:503,
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
    VendorByEmpid:(req,res)=>{
        const body = req.body;
        getVendorByEmpid(body,(err,results)=>{
            if(err)
            {
                console.log(err);
                return res.json({
                    status:503,
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