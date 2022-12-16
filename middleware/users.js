const User = require('../models/user');

module.exports = {
    checkIfUserExists: async(req,res,next)=>{
        let userExists = await User.findOne({"email": req.body.email});
        if(userExists){
            req.session.error = "A user with given Email is already registered";
            return res.redirect('back');
        }
        next();
    },
    isLoggedIn: async(req,res,next)=>{
        if(req.isAuthenticated()) return next();
        req.session.error = 'You need to be logged in to do that!';
        req.session.redirectTo = req.originalUrl;
        res.redirect('/users/login')
    }
}
