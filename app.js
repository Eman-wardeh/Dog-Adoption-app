require('dotenv').config({path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'});
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dogRoutes = require('./routes/dogRoutes');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(cors());


// mongoose.connect(process.env.dbURI)
//     .then(()=>{
//         console.log('you are connecting to database');
//         app.listen(PORT, ()=>{
//             console.log(`This app is listened at port number ${PORT}`)
//         })
//     })
//     .catch(err =>{
//         throw Error(err);
//     })

app.set('view engine', 'ejs');

//In newer Express versions, * is no longer always parsed as a valid path. so delete it.
app.use(authMiddleware.checkUser);
app.get('/', (req, res)=>{
    res.render('homePage', {title: "Home Page"})
})
app.use(authRoutes);
app.use('/dog', authMiddleware.requireAuth, dogRoutes);

module.exports = app;


