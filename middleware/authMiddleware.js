const jwt = require('jsonwebtoken');
const User = require('../models/User');


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('/login');
  }

  jwt.verify(token, 'Dogs Adoption', async (err, decodedToken) => {
    if (err) {
      return res.redirect('/login');
    }
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.redirect('/login');
    }

    req.user = user;

    next();
  });
};
const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'Dogs Adoption', async (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}
module.exports = {requireAuth, checkUser};