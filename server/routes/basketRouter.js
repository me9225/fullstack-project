const express= require("express")
const router=express.Router()

//import
const basketController= require("../controllers/basketController")
const verifyJWT = require("../middleware/verifyJWT")

//middleware
router.use(verifyJWT)

//CRUD
router.get("/all",basketController.getMyBasket)
router.post("/add",basketController.addToBasket)
router.put("/update",basketController.updateAmount)
router.delete("/delete",basketController.deleteFromBasket)

module.exports=router