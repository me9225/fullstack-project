const JWT = require('jsonwebtoken')

const verifyJWT=(req,res,next) =>
{
    //check if we have a header 'authorization' of token
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader?.startsWith('Bearer '))
        return res.status(401).send("unAuthorized")

    //if so, take out the token
    const token = authHeader.split(' ')[1]

    //validate token jwt.verify(token, process.env.MY_CODE,(err,decoded)=>...)
    JWT.verify(token, process.env.MY_CODE,(err,decodedUser)=>
    {
        if(err) return res.status(403).send("forbidden")
        req.user = decodedUser
        console.log(req.user);
        next()
    })
}

module.exports = verifyJWT