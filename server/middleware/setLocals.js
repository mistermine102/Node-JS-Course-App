module.exports = (req, res, next) => {
  res.locals.isLogged = req.session.isLogged
  res.locals.csrfToken = req.csrfToken()
  next()
}
