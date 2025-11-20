const mongoose= require("mongoose")

const ProdSchema= new mongoose.Schema(
    {
        name:
        {
            type:String,
            default:"פריט כללי"
        },
        price:
        {
            type: Number,
            required:true
        },
        onSale:
        {
            type:Boolean,
            default:false
        },
        picture:
        {
            type: String,
            required:true
        } 
    })
module.exports=mongoose.model('Prod',ProdSchema)