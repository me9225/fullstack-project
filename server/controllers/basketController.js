//model
const Basket = require("../models/Basket")
const Prod =require("../models/Prod")

/////////////////////////////////////                   CRUD

//read
const getMyBasket = async (req,res) =>
{
    console.log(req.user);
    const {_id} = req.user
    const prods = await Basket.find({user:_id}).populate("prod")

    console.log(prods);
    if (!prods?.length) 
    {
        return res.status(400).send("no products")
    }
    
    return res.send(prods)
}

//create
const addToBasket= async (req,res) =>
{
     //req.user להשתמש ב
    const {prod_id} = req.body
    const {_id} = req.user
    
    if(!prod_id)
        return res.status(400).send("prod_id is required")
    
    const duplicate = await Basket.find({user:_id, prod:prod_id})
    console.log(duplicate);
    if(duplicate?.length)
    {
        console.log(duplicate)
        req.body={amount:duplicate[0].amount+1,prod:prod_id}
        updateAmount(req,res)
        return
    }
        
    const basket = await (await Basket.create({prod:prod_id, user : _id})).populate("prod")

    if(basket)
        return res.status(201).send(`${basket.prod.name} was added to basket succesfully`)
    else
        return res.status(400).send("invalid")

}

//update
const updateAmount = async (req,res)=>
{
     //req.user להשתמש ב
    const {amount,prod}=req.body
    const {_id} = req.user

    if(!amount ||!_id || !prod)
        return res.status(400).send("all fields are required")

    const basket = await Basket.findOne({user: _id  ,prod : prod}).populate("prod")
    if(!basket)
        return res.status(400).send("no such prod")
    
    basket.amount = amount
    
    const updatedBasket = await basket.save()

    res.send(`you chose ${updatedBasket.amount} pieces of ${updatedBasket.prod.name}`)
}

//delete
const deleteFromBasket = async (req, res)=>
{
    const {prod}=req.body
    const {_id} = req.user
    
    if(!_id || !prod)
        return res.status(400).send("idprod and id user are required")

    const basket = await Basket.findOne({user:_id ,prod : prod})

    // console.log(basket);

    if(!basket)
        return res.status(400).send("no such product in that basket")

    const deleted = await basket.deleteOne()
    
    res.send(`${basket.prod} was deleted succesfully`)
}

module.exports = {getMyBasket,updateAmount,addToBasket,deleteFromBasket}
    
