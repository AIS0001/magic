
const { getUserByid } = require("./user.service");

module.exports ={
    getUserProfile:(req,res)=>{
    const id = req.param.id;
    getUserByid(id,(err,results)=>{
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
}

}