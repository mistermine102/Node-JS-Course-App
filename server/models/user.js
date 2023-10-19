const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    totalPrice: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
})

userSchema.methods.addToCart = async function (productId, quantity) {
  //check if item exists in the cart
  const foundItem = this.cart.items.find(item => item.productId.equals(productId))
  if (!foundItem) {
    //add to cart
    this.cart.items.push({
      productId,
      quantity,
    })
  } else {
    //update quantity
    foundItem.quantity += quantity
  }
  await this.save()
}

userSchema.methods.removeFromCart = async function (productId) {
  this.cart.items = this.cart.items.filter(item => !item.productId.equals(productId))
  await this.save()
}

userSchema.methods.clearCart = async function () {
  this.cart.items = []
  await this.save()
}

module.exports = Mongoose.model('User', userSchema)
