const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./db/connectDb');
const session = require('express-session');
const nocache = require('nocache');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
app.use(nocache())
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false, 
  cookie: { secure: false } 
}));

app.use(express.static('public'));

app.use(express.json());


app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));


app.use('/', userRoutes);
app.use('/admin', adminRoutes);

connectDB();

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});
