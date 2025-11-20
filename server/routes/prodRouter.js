const express= require("express")
const router = express.Router()

//import
const prodController=require("../controllers/prodController")
const verifyJWT = require("../middleware/verifyJWT")

//CRUD
router.get("/all",prodController.getProds)

//middleware
router.use(verifyJWT)

router.post("/add",prodController.addProd)
router.put("/update",prodController.updateProd)
router.delete("/delete",prodController.deleteProd)

module.exports = router