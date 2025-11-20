const User = require("../models/User")

//packages
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

//funcs
const login = async (req,res) =>
{
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).send('All fields are required')
    }
    const existsUser = await User.findOne({username}).lean()
    console.log(existsUser);
    if (!existsUser)
    {
        return res.status(401).send("unAuthorized")
    }

    const match = await bcrypt.compare(password, existsUser.password)
    console.log(match);
    if(!match)
        return res.status(401).send("unAuthorized")

    //token
    const userObj = {username:existsUser.username, name: existsUser.name, _id:existsUser._id,email:existsUser.email, phone:existsUser.phone, address: existsUser.address} 
    const token = jwt.sign(userObj,process.env.MY_CODE)
    res.send(token)
}

const register = async (req,res) =>
{
    const {username, password, name, email, phone, address} = req.body

    if(!name || !username || !email ||!password ||!address)
        return res.status(400).send("name, username, password, address and email are required")

    const duplicate = await User.findOne({username}).lean()
    console.log(duplicate);
    if(duplicate)
        return res.status(409).send("duplicate username")

    //הצפנה
    hashedpwd = await bcrypt.hash(password,10)

    //שמירה במסד נתונים
    const userToDB = {username, password: hashedpwd, name, email, phone, address}
    const user = await User.create(userToDB)
    if(user)
        return res.status(201).send(`user ${name} registered succesfully`)
    else
        return res.status(400).send("invalid user")
}

module.exports = {login, register}