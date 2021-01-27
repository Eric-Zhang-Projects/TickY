const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

const userDAO = require('./userDAO.js');

function initialize(passport) {
    // const authenticateUser = async (username, password, done) => {
    //     const user = await userDAO.getUserByUsername(username);
    //     console.log(user);
    //     if (user === undefined || user ===null){
    //         return done(null, false, {message: "Invalid username/password combination"});
    //     }
    //     try {
    //         if (await bcrypt.compare(req.body.password, user.password)) {
    //             return done(null, user);
    //         } else {
    //             return done(null, false, {message: "Invalid username/password combination"});
    //         }
    //     } catch (err) {
    //         return done(err);
    //     }
    // } 
    passport.use(new LocalStrategy(async (username, password, done) => {
        console.log("HERE");
        const user = await userDAO.getUserByUsername(username);
        if (user === undefined || user ===null){
            return done(null, false, {message: "Invalid username/password combination"});
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: "Invalid username/password combination"});
            }
        } catch (err) {
            return done(err);
        }
    }
    
    ));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, userDAO.getUserById(id));
    });
}

module.exports = initialize;