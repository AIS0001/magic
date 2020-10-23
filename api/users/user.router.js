const { createUser,maxlevel,directDownlineMembers,userToken,referralIncome,totalRefIncome,getUsers,getUserByid,updateUser,deleteUser ,login} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",createUser);
router.get("/referralincome/:id",referralIncome);
router.get("/totalref/:id",totalRefIncome);
router.post("/usertoken",userToken);
router.post("/directdownline",directDownlineMembers);


router.get("/maxlevel",checkToken,maxlevel);
router.get("/",checkToken,getUsers);

router.post("/userdata",checkToken,getUserByid);

router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);

module.exports = router;