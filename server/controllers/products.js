const Product = require('../models/product')

exports.postAddProduct = async (req, res) => {
  const { title, price } = req.body
  const product = new Product({
    title,
    price: parseFloat(price),
    userId: req.user._id
  })
  product.save()
  res.json({message: "Product added succesfully"})
}

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.json({product, message: "Product fetched succesfully"})
}

exports.editProduct = async (req, res) => {
  const { title, imageUrl, price } = req.body
  await Product.findByIdAndUpdate(req.params.id, { title, imageUrl, price })
  res.redirect({message: "Product edited succesfully"})
}

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.redirect({message: "Product deleted succesfully"})
}

exports.getProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products, {message: "Products fetched succesfully"})
}
