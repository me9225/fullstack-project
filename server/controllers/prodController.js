//model
const Basket = require("../models/Basket")
const Prod =require("../models/Prod")

/////////////////////////////////////CRUD

//read
const getProds = async (req,res) =>
{
    const prods = await Prod.find().lean() 

    if (!prods?.length) 
    {
    return res.status(400).send("no products")
    }
    
    return res.json(prods)
}

//create
const addProd= async (req,res) =>
{
    const {name, price, onSale, picture} = req.body
    
    if(!price || !picture)
        return res.status(400).send("price and picture are required")
    
    const prod = await Prod.create({name, price, onSale, picture})

    if(prod)
        return res.status(201).send("the product was added succesfully")
    else
        return res.status(400).send("invalid prod")

}

//update
const updateProd = async (req,res)=>
{
    const {_id, name, price, onSale, picture}=req.body
    
    if(!_id)
        return res.status(400).send("_id is required")

    const prod = await Prod.findById(_id)

    if(name)  prod.name=name

    if(price) prod.price=price

    if(onSale!=null) prod.onSale = onSale

    if(picture) prod.picture=picture

    const updatedProd= await prod.save()

    res.json(`${updatedProd.name} updated`)
}

//delete
const deleteProd = async (req, res)=>
{
    const {_id}= req.body

    if(!_id)
        return res.status(400).send("_id is required")

    const prod= await Prod.findById(_id)

    if(!prod)
        return res.status(400).send("no such product")

    const deleted = await prod.deleteOne()
    deleteMeFromBasket(prod)
   
    res.send(`${prod.name} was deleted succesfully`)
}

const deleteMeFromBasket= async (prod)=>{
    const todelete = await Basket.find({prod:prod._id})
    console.log(todelete);
    todelete.map(async (basket)=>{await basket.deleteOne()})
}
module.exports = {deleteProd,updateProd,addProd,getProds}
    
