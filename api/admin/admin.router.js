const { createUser,insertCategory,getUsers,viewCategories,getUserByid,getVendors,getEmployees,updateUser,deleteUser ,login} = require("./admin.controller");
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

router.post("/create",createUser);
router.post("/getusers",checkToken,getUsers);
router.post("/getvendors",checkToken,getVendors);
router.post("/getemployees",checkToken,getEmployees);

router.post("/createcategory",upload,insertCategory);
router.get("/viewcategory",viewCategories); //what you are wiating vinod?i am eating 
//you need end point to get image .... do it i will learn .. also pay you buddy okayy vinod
router.get('/image/:imageName', (req,res)=> {
   //open the chrome 
   res.sendFile(path.join(__dirname, `../../uploads/${req.params.imageName}`));//ypu understand what happened?
   
   // error in path let me iwanna to print the path off __dirnmae
   console.log(__dirname);//wait
;})

//router.get("/updateemployee",checkToken,);? what? //view category must be a get request!ohh
router.get("/deleteemployee",checkToken,getUsers);


router.get("/:id",checkToken,getUserByid);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);


module.exports = router;