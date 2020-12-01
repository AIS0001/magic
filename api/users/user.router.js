const { createUser,maxlevel,insertCart,updateUserPassword,
    getCartItems,getVendorBycategory,directDownlineMembers,
    addCategory,cashBackIncome,
    insertKycDetails,
    viewKycDetails,
    insertLevelIncome,
    userToken,referralIncome,totalRefIncome,getUsers,
    getUserByid,updateUserRecord,getProductsDetailsByid,
    deleteUser ,login} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",createUser);
router.post("/referralincome",checkToken,referralIncome);
router.post("/totalref",checkToken,totalRefIncome);
//router.post("/usertoken",userToken);
router.post("/directdownline",checkToken , directDownlineMembers);
router.post("/cashbackincome",checkToken,cashBackIncome);
router.post("/newcategory",checkToken,addCategory);

router.post("/getvendorbycategory",checkToken,getVendorBycategory);
router.post("/getcartitems",checkToken,getCartItems);
router.post("/addtocart",checkToken,insertCart);

router.get("/maxlevel",checkToken,maxlevel);
router.get("/",checkToken,getUsers);
router.post("/userdata",checkToken,getUserByid);

router.post("/updatepassword",checkToken,updateUserPassword);

router.post("/insertkyc",checkToken,insertKycDetails);
router.post("/viewkyc",checkToken,viewKycDetails);
router.post("/updateuserrecord",updateUserRecord);
router.post("/viewproduct",getProductsDetailsByid);
//router.delete("/",checkToken,deleteUser);
router.post("/login",login);

module.exports = router;