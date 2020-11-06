const { createUser,
    getUsers,
    UserByEmpid,
    createProducts,
    VendorByEmpid,
    viewProductsByVendor,
    login} = require("./emp.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const path = require("path");
const multer = require("multer");
// error from multeeer packege so i uninstall and re install ok?okcc

var maxSize = 1000000*90 ;


const storage = multer.diskStorage({
   destination: "./uploads/",//the error can find this path so we need to get this path
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: maxSize},
}).fields([
 /*  {
     name: 'proof1',
     maxCount: 1,
   },*/
   {
     name: 'gallary',
     maxCount: 1,
   },
 ]);


router.post("/create",checkToken,createUser);
router.get("/",checkToken,checkToken,getUsers);

router.post("/createproduct",checkToken,upload,createProducts);
router.post("/viewproductsbyvendor",checkToken,viewProductsByVendor);

//router.post("/viewallusers",checkToken,UserByid);
router.post("/viewusers",UserByEmpid);
router.post("/viewvendors",VendorByEmpid);
router.post("/login",login);


module.exports = router;