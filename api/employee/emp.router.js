const { createUser,
    getUsers,
    UserByEmpid,
    VendorByEmpid,
    login} = require("./emp.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",checkToken,createUser);
router.get("/",checkToken,checkToken,getUsers);
//router.post("/viewallusers",checkToken,UserByid);
router.post("/viewusers",UserByEmpid);
router.post("/viewvendors",VendorByEmpid);
router.post("/login",login);


module.exports = router;