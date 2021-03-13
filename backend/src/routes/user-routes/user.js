const bcrypt = require('bcrypt')
const passport = require('passport');
const uuid = require('uuid');

const userDAO = require('./user-dao.js');
const initialize = require('./passportConfig.js');

 initialize(passport);

 /*
Login, Register, Logout, Forgot password
 */

 const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No user exists");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                req.session.customerId = req.user.customer_id;
                console.log("New Session created: " + req.session.id + " for user id: " + req.session.passport.user);
                //console.log(req.user);
                res.send("Logged In");
                //res.redirect('/api/home');
            });
        }
    })(req, res, next);
}

const register = async(req, res) => {
    console.log("Register User");
    if (req.session.passport === undefined){
    console.log("no passport session");
    } else {
        console.log(req.session.id + " " + req.session.passport.user);
    }
    try {
        //Creates hashedpassword with salt rounds = 10
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            id: uuid.v4(),
            email: req.body.email,
            password: hashedPassword
        }
        const result = await userDAO.registerUser(user);
        if (result.detail === undefined){
            console.log("Success");
            res.json("Success registering new user");
        } else {
            //console.log(result.detail);
            if (result.detail.includes("email")){
                console.log("Dup email");
                res.json("Email already exists");
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const logout = async (req, res) => {
    console.log("Logout");
    //store.destroy(req.session.id);
    //console.log(req.session.passport.user);
    req.logout();
    //console.log(req.session.passport.user);
    req.session.destroy((err)=>{
        if (err){
            return next(err);
        }
        res.end();
    })
    res.json("logged out");

    //res.redirect('/login');
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        return res.redirect('/login');
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect('/');
    } else {
        return next();
    }
}

module.exports = {
    login,
    register,
    logout
}