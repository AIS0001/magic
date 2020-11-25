const { create,
    getUsersByToken,
    directdownline,
    InsertcashBackIncome,
    insertCategory,
    getcashbackIncomeByUserId,
    insertEmployeeWallet,
    getMaxLevel,
    getTotalUserByempId,
    insertCompanyWallet,
    getTotalRefIncome,
    refIncome,
    getRefIncomeByUserId,
    getUsersByEmpID,
    insertToken, getUsers,
    getUserByid,
    getTotalEmployee,
    getPoolUsers,
    getAllEmployee,
    updateUsers,
    updatePassword,
    getProductByid,
    getcartItemsbyUserid,
    insertCartItems,
    getVendorByCategory,
    deleteUser,
    getUserByuserEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
//const { CreateToken } = require("./token.middleware");
module.exports = {
    maxlevel: (req, res) => {

        getMaxLevel((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                level_result: results
            });
        });
    },
    referralIncome: (req, res) => {
        const body = req.body;
        //console.log(uid);
        getRefIncomeByUserId(body, (err, income) => {

            if (err) {
                console.log(err);
                return;
            }
            if (!income) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: income
            });
        });
    },
    cashBackIncome: (req, res) => {
        const body = req.body;
        //console.log(uid);
        getcashbackIncomeByUserId(body, (err, income) => {

            if (err) {
                console.log(err);
                return;
            }
            if (!income) {
                return res.status(404).json({
                    status: 404,
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: income
            });
        });
    },
    //Total ref Income
    totalRefIncome: (req, res) => {
        const body = req.body;

        getTotalRefIncome(body, (err, total_income) => {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    status: 503,
                    success: 0,
                    message: err
                });
            }
            if (!total_income) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: total_income
            });
        });
    },
    addCategory: (req, res) => {
        const body = req.body;
        insertCategory(body, (err, results) => {
            if (err) {
                console.log(err);
                //    console.log(body);
                return res.status(500).json({
                    status: 500,
                    success: 0,
                    message: "500 Internal Server Error"
                });
            }
            //console.log(body);
            return res.status(200).json({
                // console.log(pool1Amount);
                status: 200,
                success: 1,
                status: 200
            });
        });

    },
    insertCart: (req, res) => {
        const body = req.body;
        insertCartItems(body, (err, results) => {
            if (err) {
                console.log(err);
                //    console.log(body);
                return res.status(500).json({
                    status: 500,
                    success: 0,
                    message: "500 Internal Server Error"
                });
            }
            //console.log(body);
            return res.status(200).json({
                // console.log(pool1Amount);
                status: 200,
                success: 1,
                status: 200
            });
        });

    },
    createUser: (req, res) => {

        var currentDate = new Date(new Date() - 3600 * 1000 * 3).toISOString();

        const body = req.body;
        const salt = genSaltSync(10);
        const empid = body.empcode;
        var uid = Math.floor(Math.random() * 100000);
        //console.log(uid);
        //body.password=hashSync(body.password,salt);
        var password = "welcome@123";
        password = hashSync(password, salt);
        //get total cashBack user list
        getUsersByEmpID(empid, (err, useremp) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!useremp) {
                return res.status(404).json({
                    success: 0,
                    message: "Unable to get Total user record by empid"
                });
            }
            /*return res.status(200).json({
                // console.log(pool1Amount);
                 success:1,
                 data:useremp
                 
             });*/
        });

        var cardAmount = 500;
        var companyShare = cardAmount * 0.40;
        var empShare = cardAmount * 0.20;
        var userShare = cardAmount * 0.20;

        var poll1UserAmount = 0;
        var poll2UserAmount = 0;
        var poll3UserAmount = 0;
        var poll4UserAmount = 0;
        var poolwiseUsers = 0;


        getTotalUserByempId(empid, (err, tusers) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!tusers) {
                return res.json({
                    success: 0,

                    message: "Unable to get Total user record by empid"
                });
            }
            //console.log(tusers[0].total_users);

            const remainAmount = cardAmount - (companyShare + empShare);
            var userRefIncome = remainAmount * 0.40;
            const usertype = body.type;
            const refid = body.refcode;
            const dte = body.date;
            var uremark = ""
            var eremark = "ESC"

            if (usertype == "user") {
                uremark = "User account activation fee";
               
                var empAmount = empShare * 0.20; //20% to employee
                var remainingEmployeeShare = empShare - empAmount;  //Remaining emp share amount
               var damount=0;
                //  console.log(empAmount);
               
                 insertEmployeeWallet(uid, body.empcode, empAmount, dte, uremark, (err, results) => {
                    if (err) {
                        console.log(err);
                        //    console.log(body);
                        return res.status(500).json({
                            status: 500,
                            success: 0,
                            message: "500 Internal Server Error"
                        });
                    }
                   
                })
            

               if (refid != "0") {

                //Employee Share Calculation
               
               //Remaining employee share distribute to all employee
 
               getTotalEmployee((err, cnt) => {
                   
                damount = remainingEmployeeShare/cnt[0].total_emp;
               // console.log(damount);
                getAllEmployee((err, eresults) => {
                    // return res.json({ data: results,});
                    eresults && eresults.map((results1, index) => {
                        //console.log(results1.userid);
                        insertEmployeeWallet(results1.userid, body.empcode, damount, dte, uremark, (err, results) => {
                            if (err) {
                                console.log(err);
                                //    console.log(body);
                                return res.status(500).json({
                                    status: 500,
                                    success: 0,
                                    message: "500 Internal Server Error"
                                });
                            }
                        })
                       
                         })
            })
            
            });
             
               // Distribute to all employees  remainingEmployeeShare
                    //User Share Calculation

                    //If  user refer another user  Then user Rs. 200 Share Calculation 40% to user and 60 percent to company
                    var userAmount = remainAmount * 0.40;
                  
                    refIncome(userAmount, usertype, refid, dte, (err, poolDataresults) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (!poolDataresults) {
                            return res.json({
                                success: 0,
                                message: "Something in pool /cashback data calculation"
                            });
                        }


                    });

                    var reainingUserShareAmount = remainAmount - userAmount;
                    uremark="User Share Remaining Amount";
                    insertCompanyWallet(uid,usertype,reainingUserShareAmount,dte,uremark, (err, results) => {
                        if (err) {
                            console.log(err);
                            //    console.log(body);
                            return res.status(500).json({
                                status: 500,
                                success: 0,
                                message: "500 Internal Server Error"
                            });
                        }
                        
                    })

                    //Direct Refferral Income Generated
                  /*  refIncome(userRefIncome, usertype, refid, dte, (err, poolDataresults) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (!poolDataresults) {
                            return res.json({
                                success: 0,
                                message: "Something in pool /cashback data calculation"
                            });
                        }


                    })*/



                }
                else {

                    //If no user refferer Then user Rs. 200 Share Calculation
                    const pool1Amount = remainAmount * 0.40;
                    const pool2Amount = remainAmount * 0.30;
                    const pool3Amount = remainAmount * 0.20;
                    const pool4Amount = remainAmount * 0.10;
                    poolwiseUsers = Math.round((tusers[0].total_users + Number.EPSILON) * 0.25);
                    //console.log(poolwiseUsers);
                    poll1UserAmount = pool1Amount / poolwiseUsers;
                    poll2UserAmount = pool2Amount / poolwiseUsers;
                    poll3UserAmount = pool3Amount / poolwiseUsers;
                    poll4UserAmount = pool4Amount / poolwiseUsers;
                    //Cash Back Income
                    //1. Cashback Income 40,30,20,10 from User Share Rs. 200
                    var start = 0;
                    var ofset = 0;
                    getPoolUsers(empid,poolwiseUsers,ofset, (err, results) => {
                        // return res.json({ data: results,});
                        results && results.map((results1, index) => {
                            //console.log(results1.userid);
                            InsertcashBackIncome(results1.userid, poll1UserAmount, dte, (err, results) => {
                                console.log(poll1UserAmount);
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (!poolDataresults) {
                                    return res.json({
                                        success: 0,
                                        message: "Something in pool /cashback data calculation"
                                    });
                                }
                            });
                        });
                    }),
                        ofset = ofset+poolwiseUsers;
                       //2nd Pool Amount
                       getPoolUsers(empid,poolwiseUsers,ofset, (err, results) => {
                        // return res.json({ data: results,});
                        results && results.map((results1, index) => {
                            //console.log(results1.userid);
                            InsertcashBackIncome(results1.userid, poll2UserAmount, dte, (err, results) => {
                                console.log(poll1UserAmount);
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (!poolDataresults) {
                                    return res.json({
                                        success: 0,
                                        message: "Something in pool /cashback data calculation"
                                    });
                                }
                            });
                        });
                    }),
                        ofset = ofset+poolwiseUsers;
                          //3rd Pool Amount
                          getPoolUsers(empid,poolwiseUsers,ofset, (err, results) => {
                            // return res.json({ data: results,});
                            results && results.map((results1, index) => {
                                //console.log(results1.userid);
                                InsertcashBackIncome(results1.userid, poll3UserAmount, dte, (err, results) => {
                                   // console.log(poll1UserAmount);
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (!poolDataresults) {
                                        return res.json({
                                            success: 0,
                                            message: "Something in pool /cashback data calculation"
                                        });
                                    }
                                });
                            });
                        }),
                            ofset = ofset+poolwiseUsers;
                           //4th Pool Amount
                           getPoolUsers(empid,poolwiseUsers,ofset, (err, results) => {
                            // return res.json({ data: results,});
                            results && results.map((results1, index) => {
                                //console.log(results1.userid);
                                InsertcashBackIncome(results1.userid, poll4UserAmount, dte, (err, results) => {
                                    console.log(poll1UserAmount);
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (!poolDataresults) {
                                        return res.json({
                                            success: 0,
                                            message: "Something in pool /cashback data calculation"
                                        });
                                    }
                                });
                            });
                        })   

                //Cash abck income end
                  
                }
              
                insertCompanyWallet(uid,usertype,companyShare,dte,uremark,(err,results)=>{
                    if(err)
                    {
                        return res.status(500).json({
                            status:500,
                            success:0,
                            message:err
                        });
                    }
                   
                })


            }
            else if (usertype1 == "vendor") {
                uremark = "Vendor  fee";
            }
            else if (usertype1 == "employee") {
                uremark = "Employee Fee  Activated";

            }
            else {
                uremark = "";
            }

        });
        //////////////////////
        //pool amount distribution
        ///////////////////

        const poolDatas = {
            "pool1": poll1UserAmount,
            "pool2": poll2UserAmount,
            "pool3": poll3UserAmount,
            "pool4": poll4UserAmount
        }

        create(body, password, uid, (err, results) => {
            if (err) {
                console.log(err);
                //    console.log(body);
                return res.status(500).json({
                    status: 500,
                    success: 0,
                    message: "500 Internal Server Error create"
                });
            }
            //console.log(body);
            return res.status(200).json({
                // console.log(pool1Amount);

                success: 1,
                status: 200,
                message: "User created Successfully"
            });
        });
        //get employee id by cardno

    },
    //on referesh get user token details
    userToken: (req, res) => {
        const body = req.header("auth_token");
        // console.log(body);
        // const tokenresult=[ ];
        const tkn = body
        getUsersByToken(tkn, (err, tokenresult) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!tokenresult) {
                return res.json({
                    status: 401,
                    tkn: tkn,
                    success: 0,
                    message: "Record not found",

                });
            }
            // console.log(tokenresult[0]);
            getUserByid(tokenresult[0], (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!results) {
                    return res.json({
                        status: 401,
                        success: 0,
                        message: "Record not found",

                    });
                }
                return res.json({
                    status: 200,
                    success: 1,
                    token: tokenresult[0].token,
                    data: results
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
    directDownlineMembers: (req, res) => {
        const body = req.body;

        directdownline(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    status: 401,
                    success: 0,
                    message: "Record not found",

                });
            }
            console.log(results);
            return res.json({
                status: 200,
                success: 1,
                data: results
            });
        });
    },
    getCartItems: (req, res) => {
        const body = req.body;
        getcartItemsbyUserid(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    status: 401,
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                status: 200,
                success: 1,
                data: results
            });
        });
    },
    getProductsDetailsByid: (req, res) => {
        const body = req.body;
        getProductByid(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    status: 401,
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                status: 200,
                success: 1,
                data: results
            });
        });
    },
    getUserByid: (req, res) => {
        const body = req.body;
        getUserByid(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    status: 401,
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                status: 200,
                success: 1,
                data: results
            });
        });
    },

    getVendorBycategory: (req, res) => {
        const body = req.body;
        getVendorByCategory(body, (err, results) => {
            if (err) {

                return res.json({
                    status: 500,
                    success: 0,
                    message: err
                });;
            }
            if (!results) {
                return res.json({
                    status: 401,
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                status: 200,
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    status: 200,
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateUserRecord: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        //body.password = hashSync(body.password, salt);
        updateUsers(body, (err, results) => {
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
    updateUserPassword: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updatePassword(body, (err, results) => {
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

    deleteUser: (req, res) => {
        // const id = req.param.id;
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "Record deleted successfully"
            })
        });

    },

    login: (req, res) => {
        const body = req.body;
        getUserByuserEmail(body.userid, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid userid or Password"

                });

            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jwt = sign({ result, results }, "TXlMb3ZlUHJpeWFua2E=", {
                    expiresIn: "1h"
                });

                insertToken(body.userid, jwt, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            status: 500,
                            success: 0,
                            message: "500 Internal Server Error"
                        });
                    }
                })
                return res.status(200).json({
                    success: 1,
                    message: "logged in successfully",
                    data: results,
                    status: 200,
                    token: jwt
                })



            }
            else {
                return res.jason({
                    success: 0,
                    message: "Invalid email or password"
                });

            }
        });
    }


}