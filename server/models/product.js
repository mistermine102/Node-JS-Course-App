const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  imageUrl: String,
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

module.exports = model('Product', productSchema)
