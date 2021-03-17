function checkAuthenticated(req, res, next) {
    console.log("Check if logged in");
    if (req.isAuthenticated()){
        console.log("Used is logged in");
        return next();
    } else {
        console.log("Used is NOT logged in, redirecting");
        return res.send({user: false});
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        console.log("Used is NOT logged in, redirecting");
        return res.redirect('/');
    } else {
        return next();
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
}