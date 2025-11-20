//import
require("dotenv").config()
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConnect")
const mongoose = require("mongoose")

//connectDB 
connectDB()
mongoose.connection.once('open',()=>{
    console.log("Connected to DB")
    //server
    app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`))
})

mongoose.connection.on('error',err=>console.log(err))

//express
const express=require("express")
const app=express()
const PORT=process.env.PORT || 7000

//middlewares
app.use(express.json())
app.use(express.static("public"))
app.use(cors(corsOptions))

//  Routes
    app.use("/products", require("./routes/prodRouter"))
    app.use("/basket", require("./routes/basketRouter"))
    app.use("/api/users", require("./routes/userRoute"))

