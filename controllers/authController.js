const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    const errors = { email: '', password: '' };

    // duplicate email
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // login errors
    if (err.message === 'Incorrect email') {
        errors.email = 'This email is not registered';
    }

    if (err.message === 'Incorrect password') {
        errors.password = 'This password is incorrect';
    }

    return errors;
};

const maxLength = 60 * 60 * 24;
const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxLength,
    })
}

const signup_get = (req, res) =>{
    
    res.render('signup')

};
const signup_post = async (req, res) =>{
    const {name, email, password} = req.body;
    console.log("signup post hit", name, email, password);
    try{
        //user is actually a Promise, not the real user. // user._id is therefore undefined
        //add async await till the user is created and then create a token 
        const user = await User.create({name, email, password});
        //create token 
        const token = createToken(user._id);
        res.cookie('jwt', token, {maxAge: maxLength * 1000, httpOnly: true
        });
        res.status(201).json({user});
        console.log("signup hit")
        }
    catch(err){
        const errors = handleErrors(err);
        return res.status(400).json({errors});

    }
};

const login_get = (req, res) =>{
    res.render('login')
};
const login_post = async (req, res) =>{
    const{email, password} = req.body || {};
    try{
        //take the static method inside the User model
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {maxAge: maxLength * 1000, httpOnly: true
        });
        res.status(200).json({user: user._id});
    }catch(err){
        const errors = handleErrors(err);
        return res.status(400).json({errors});
    }
    
}
const logout_get =(req, res) =>{
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/login');
}
module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}