
exports.getCart = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId")
    const cart = user.cart
    //calcultate totalPrice
    for(let item of cart.items) {
      cart.totalPrice += item.productId.price * item.quantity
    }

    res.json({cart, message: "Cart fetched succesfully"})
  } catch (err) {
    return next(err)
  }
}

exports.removeItem = async (req, res) => {
  await req.user.removeFromCart(req.params.id)
  res.json({message: "Cart item removed succesfully"})
}

exports.addItem = async (req, res) => {
  const { productId, quantity } = req.body
  await req.user.addToCart(productId, parseInt(quantity))
  res.json({message: "Cart item added succesfully"})
}
