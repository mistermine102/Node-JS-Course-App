const express = require('express')

const productsController = require('../controllers/products')
const fileUpload = require('../middleware/multer')

const router = express.Router()

router.post('/add-product', productsController.postAddProduct)
router.post('/edit-product/:id', productsController.editProduct)
router.post('/delete-product/:id', productsController.deleteProduct)

module.exports = router
