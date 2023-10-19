module.exports = (req, res, next) => {
    if(req.session.isLogged) {
        return next()
    }
    res.redirect("/login")
}