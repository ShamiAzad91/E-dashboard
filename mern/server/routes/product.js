const express = require("express");
const verifyToken = require("../middleware/token");

const router = express.Router();

const {addProduct,getAllProducts,removeProduct,getSingleProduct,updateSingleProduct}  = require("../controllers/product");

router.post("/add",verifyToken,addProduct);
router.get("/all",verifyToken,getAllProducts);
router.delete("/remove/:productId",verifyToken,removeProduct);
router.get("/single/:productId",verifyToken,getSingleProduct);
router.put("/update/:productId",verifyToken,updateSingleProduct);




module.exports = router;