const { Schema, model } = require('mongoose')
const orderSchema = new Schema({
  products: [
    {
      product: Object,
      quantity: Number,
    },
  ],
  user: {
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    email: String,
  },
})
module.exports = model('Order', orderSchema)
