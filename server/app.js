const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDbStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const multer = require('multer')

const findUser = require('./middleware/findUser')

const dbUri = 'mongodb+srv://szymonix:szymonix@atlascluster.0207bfc.mongodb.net/node-course?retryWrites=true&w=majority'
const app = express()

const store = new mongoDbStore({
  uri: dbUri,
  collection: 'sessions',
})

const csrfProtection = csrf()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
})

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({storage}).single("image"))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false, store }))
app.use(csrfProtection)
app.use(findUser)

//routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

// error middleware
app.use((error, req, res, next) => {
  res.status(500).json("Internal server error")
})

//database connect
mongoose
  .connect(dbUri)
  .then(() => {
    console.log('Connected to database')
    app.listen(3000)
  })
  .catch(err => {
    console.log("Can't connect to the database", err)
  })
