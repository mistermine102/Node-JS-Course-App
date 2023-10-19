const Order = require('../models/order')

exports.checkout = async (req, res) => {
  try {
    //add order
    const user = await req.user.populate('cart.items.productId')
    const products = user.cart.items.map(item => ({ product: { ...item.productId._doc }, quantity: item.quantity }))
    const order = Order({
      products,
      user: {
        email: req.user.email,
        _id: req.user._id,
      },
    })
    await order.save()
    await req.user.clearCart()
    res.json({message: "Order saved succesfully"})
  } catch (err) {
    return next(err)
  }
}

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ 'user._id': req.session.user._id })
  for (let order of orders) {
    let totalPrice = 0
    for (let item of order.products) {
      totalPrice += item.product.price * item.quantity
    }
    order.totalPrice = totalPrice
  }
  res.json({message: "Orders fetched successfully"})
}
