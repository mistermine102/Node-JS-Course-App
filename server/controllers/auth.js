const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const {errors} = validationResult(req)
    if(errors.length) {
      const errorMessage = errors[0].msg
      return res.status(422).json({message: errorMessage})
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(406).json({message: "Incorrect email or password"})
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      return res.status(406).json({message: "Incorrect email or password"})
    }
    req.session.user = user
    req.session.isLogged = true
    res.json({message: "Logged in succesfully"})
  } catch (err) {
    return next(err)
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.json({message: "Logged out succesfully"})
}

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body
    const {errors} = validationResult(req)
    if(errors.length) {
      const errorMessage = errors[0].msg
      return res.status(422).json({message: errorMessage})
    }
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(406).json({message: "User with that email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      email,
      password: hashedPassword,
      cart: { items: [], totalPrice: 0 },
    })
    await user.save()
    res.json({message: "Signed up succesfully"})
  } catch (err) {
    return next(err)
  }
}
