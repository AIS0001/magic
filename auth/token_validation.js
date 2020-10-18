const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken:(req,res,next)=>{
        const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = verify(token,"TXlMb3ZlUHJpeWFua2E=");
        req.user=verified;
        next();
    }
    catch(err)
    {
        res.status(401).send('Inavlid Token');
    }
       /* let token = req.get("autorization");
        if(token)
        {
            token = token.slice(7);
            verify(token,"MyLovePriyanka",(err,decoded)=>{
                if(err)
                {
                    res.json({
                        success:0,
                        message:"Invalid token"

                    });
                }else{
                    next();
                }
            })
        }
        else{
            res.json({
                success:0,
                message:"Access Denied"
            })
        }*/
    }

}