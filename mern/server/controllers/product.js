const Product = require("../models/product");
exports.addProduct = async (req, res) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    if (result) {
      return res
        .status(201)
        .json({
          product: result,
          error: "",
          msg: "succssfully added",
          status: "success",
        });
    }
    return res
      .status(400)
      .json({ error: "", msg: "succssfully added", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        err: err.message,
        message: "Something went wrong",
        status: "failed",
      });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let result = await Product.find();
    if (result.length > 0) {
      return res
        .status(201)
        .json({
          product: result,
          error: "",
          msg: "All products",
          status: "success",
        });
    }
    return res
      .status(400)
      .json({ error: "failed to get product", msg: "unabel to get products", status: "failed" });
  } catch (err) {
    return res
      .status(500)
      .json({
        err: err.message,
        message: "Something went wrong",
        status: "failed",
      });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.productId },{new:true});
    if (!result)
      return res
        .status(400)
        .json({
          error: "failed",
          msg: "failed to delete record",
          status: "failed",
        });
    return res
      .status(200)
      .json({
        error: "",
        msg: "successfully  delete record",
        status: "success",
        result:result
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleProduct = async(req,res)=>{
  try {
    const result = await Product.findOne({_id:req.params.productId});

    if(!result)
    return res.status(400).json({error:'failed to get product',msg:'unable to get ',status:'failed'})
    return res.status(200).json({product:result,error:'',msg:'successfullly get ',status:'success'})
    
  } catch (err) {
    console.log(err)
    
  }
}

exports.updateSingleProduct = async(req,res)=>{
  try {
    let productExist = await Product.findOne({_id:req.params.productId});
    // console.log(productExist);
    if(!productExist)
    return res.status(400).json({error:'failed to find product',msg:'unable to get ',status:'failed'})

 const result = await Product.updateOne(
  {_id:req.params.productId},
  {$set:req.body},
  )
    if(!result)
    return res.status(400).json({error:'failed to update product',msg:'unable to get ',status:'failed'})
    return res.status(200).json({product:result,error:'',msg:'successfullly updated ',status:'success'});

    
  } catch (err) {
    console.log(err)
    
  }
}