const app = require('express')();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');
const adminRoutes = require('./adminRoutes');
const { port, session_secret } = require('./secrets.js');

require('./routes/user-routes/passportConfig')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(flash());
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  port: 6379,
  host: 'localhost'
});
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: session_secret,
  resave: false, //If nothing is wrote to session, do not override session, typically for renewing session
  saveUninitialized: false,
  cookie: {
    secure: false, //true if cookie is transmitted over https
    httpOnly: true, //true prevents client side JS from reading cookie
    maxAge: 1000 * 60 * 30, //max age in ms

  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', routes);
app.use('/admin/api/', adminRoutes);
//https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified
//uuid

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})