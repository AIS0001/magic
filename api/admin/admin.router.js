const { createUser,getUsers,getUserByid,getVendors,getEmployees,updateUser,deleteUser ,login} = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",createUser);
router.post("/getusers",checkToken,getUsers);
router.post("/getvendors",checkToken,getVendors);
router.post("/getemployees",checkToken,getEmployees);

router.get("/updateemployee",checkToken,);
router.get("/deleteemployee",checkToken,getUsers);


router.get("/:id",checkToken,getUserByid);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);


module.exports = router;