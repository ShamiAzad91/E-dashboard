const jwt = require("jsonwebtoken");
// const verifyToken = (req,res,next)=>{
// let token = req.headers['authorization'];
// if(token){
//     token = token.split(' ')[1];
//      console.log('middleware callled',token);
//      jwt.verify(token,process.env.JWT_SECRET,(err,valid)=>{
//         if(err){
//                 res.send({result:'plz provide valid token'})
//         }else{
//             next();
//         }
//      })

// }else{
//     return res.status(401).json({message:"please add token with headers"})
// }

// next()
// }

const verifyToken =(req,res,next)=>{
    let token = req.headers['authorization']
    if(token){
            token = token.split(' ')[1];
            //  console.warn("middleware called if ",token)
             jwt.verify(token,process.env.JWT_SECRET,(err,valid)=>{
                 if(err){
                      res.status(401).send({result:"Please provide valid token"});
                }else{
                        next();
                 }

             })

    }else{
        res.status(403).send({result:"Please add token with header"});
    }
    
}

module.exports = verifyToken;