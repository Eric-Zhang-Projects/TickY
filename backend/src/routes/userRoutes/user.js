const bcrypt = require('bcrypt')
const passport = require('passport');

const userDAO = require('./userDAO.js');
const initialize = require('./passportConfig.js');

initialize(passport);


const register = async(req, res) => {
    console.log("Register User");
    try {
        //Creates hashedpassword with salt rounds = 10
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        }
        const result = await userDAO.registerUser(user);
        if (result.detail === undefined){
            console.log("Success");
            res.json("Success registering new user");
        } else {
            console.log(result.detail);
            if (result.detail.includes("username")){
                console.log("Dup username");
                res.json("Username already exists");
            }
            if (result.detail.includes("email")){
                console.log("Dup email");
                res.json("Email already exists");
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    console.log("Login user");
    console.log(req.body);
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No user exists");
        else {
            req.logIn(user, (err) => {
                
            })
        }
    }
    
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });
    //res.json("Success logging in user");
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


// const login = async(req, res) => {
//     console.log("Login user");
//     try {
//         const user = await userDAO.getUserByUsername(req.body.username);
//         console.log(user);
//         if (user === undefined || user === null){
//             return res.json("Invalid username/password combination");
//         } else {
//             if (await bcrypt.compare(req.body.password, user.password)) {
//                 res.json("Success!");
//             } else {
//                 res.json("Invalid username/password combination");
//             }
//         }
//     } catch (err) { 
//         console.log(err);
//     }
// }

module.exports = {
    register,
    login,
    logout
}