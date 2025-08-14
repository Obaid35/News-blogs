const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(expressLayouts)
app.set('layout','layout')
app.set('views', path.join(__dirname, 'views'));
// View Engine
app.set('view engine', 'ejs');

//Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB connected");
    const port = process.env.PORT || 3000;
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
});

// Routes
app.use('/admin',(req, res, next) =>{
  res.locals.layout ='admin/layout';
  next();
})
app.use('/admin', require('./routes/admin'));

app.use('/', require('./routes/frontend'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


