const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

const userDAO = require('./user-dao.js');

function initialize(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
        console.log("Local Strategy for authenticating user");
        console.log(username, password);
        const user = await userDAO.getUserByEmail(username);
        if (user === undefined || user ===null){
            console.log("Email failed");
            return done(null, false, {message: "Invalid email/password combination"});
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log("Password passed, login successful");
                return done(null, user);
            } else {
                console.log("Password failed");
                return done(null, false, {message: "Invalid email/password combination"});
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