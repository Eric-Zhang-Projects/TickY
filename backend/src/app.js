const app = require('express')();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const routes = require('./routes');
const adminRoutes = require('./adminRoutes');
const { port, session_secret } = require('./secrets.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(flash());
app.use(session({
  secret: session_secret,
  resave: false,
  saveUninitialized: false
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