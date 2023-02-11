var jwt = require('jsonwebtoken');
const JWT_SECRET="primus@b6m$pr";

const fetchuser= (req, res, next)=>{
    //getting user from JWT token and adding user id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "invalid token"});
    }

    try {
      const data= jwt.verify(token, JWT_SECRET);
      req.user= data.user;  
      next();
    } catch (error) {
        res.status(401).send({error: "invalid token"}); 
    }

}


module.exports = fetchuser;