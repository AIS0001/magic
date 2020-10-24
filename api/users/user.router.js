const { createUser,maxlevel,directDownlineMembers,addCategory,cashBackIncome,userToken,referralIncome,totalRefIncome,getUsers,getUserByid,updateUser,deleteUser ,login} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",createUser);
router.post("/referralincome",referralIncome);
router.post("/totalref",totalRefIncome);
router.post("/usertoken",userToken);
router.post("/directdownline",checkToken , directDownlineMembers);
router.post("/cashbackincome",cashBackIncome);
router.post("/newcategory",addCategory);


router.get("/maxlevel",checkToken,maxlevel);
router.get("/",checkToken,getUsers);

router.post("/userdata",checkToken,getUserByid);

//router.patch("/",checkToken,updateUser);
//router.delete("/",checkToken,deleteUser);
router.post("/login",login);

module.exports = router;