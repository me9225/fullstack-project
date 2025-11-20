const mongoose= require("mongoose")

const BasketSchema= new mongoose.Schema(
    {
        prod:
        {
            type: mongoose.ObjectId,
            ref:'Prod' 
        },
        user:
        {
            type:mongoose.ObjectId,
            ref:'User'
        },
        amount:
        {
            type:Number,
            default:1,
            min:1
        }
    },
    {
        timestamps:true
    })

module.exports=mongoose.model('Basket',BasketSchema)