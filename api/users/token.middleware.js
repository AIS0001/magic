
const { insertToken } = require("./user.service");

module.exports ={
    CreateToken:(req,res)=>{
    const body =req.body;
    insertToken(body,(err,results)=>{
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                status:500,
                success:0,
                message:"500 Internal Server Error"
            });
        }
      
    });;
}

}