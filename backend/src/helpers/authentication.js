function checkAuthenticated(req, res, next) {
    console.log("Check if logged in");
    if (req.isAuthenticated()){
        console.log("Used is logged in");
        res.locals.user = true;
        return next();
    } else {
        console.log("Used is NOT logged in, redirecting");
        res.locals.user = null;
        return res.send({user: false});
    }
}

function allAllowed(req, res, next) {
    if (req.isAuthenticated()){
        console.log("Endpoint available to all has user logged in");
        res.locals.user = true;
        return next();
    } else {
        console.log("Endpoint available to all has no user");
        res.locals.user = null;
        return next();
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        console.log("Used is NOT logged in, redirecting");
        return res.send({user: false});
    } else {
        return next();
    }
}

module.exports = {
    checkAuthenticated,
    allAllowed,
    checkNotAuthenticated
}