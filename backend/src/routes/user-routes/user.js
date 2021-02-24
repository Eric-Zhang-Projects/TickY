const bcrypt = require('bcrypt')
const passport = require('passport');
//const { uuid } = require('uuidv4');

const userDAO = require('./userDAO.js');
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
                console.log(req.user);
                res.send("Success!");
            });
        }
    })(req, res, next);
}

const register = async(req, res) => {
    console.log("Register User");
    try {
        //Creates hashedpassword with salt rounds = 10
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
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
    req.logOut();
    res.redirect('/login');
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