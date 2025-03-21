const jwt=require('jsonwebtoken')


const jwtMiddlewareFun=(req,res,next)=>{
    try{
        console.log(req.headers)
        const token =req.headers.authorization.split(" ")[1];
        if(token){
            const result=jwt.verify(token,process.env.sceret_key)
            console.log(result)
            req.payload=result.userId
            next()
        }
        else{
            res.status(406).json("please login first")
        }
    }
    catch(err){
        console.log(err)
        res.status(406).json("please login ")
    }
}


module.exports=jwtMiddlewareFun