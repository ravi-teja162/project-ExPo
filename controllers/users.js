const User = require('../models/user');
const passport = require('passport');
const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "dyeerwjyd",
    api_key: "172221199623714",
    api_secret: process.env.CLOUDINARY_SECRET
});
module.exports = {

  async postRegister(req, res, next) {
    try {
      
    //   req.body.user.profilePic = [];


    //   for (const file of req.files) {
    //     let image = await cloudinary.v2.uploader.upload(file.path);
    //     req.body.user.profilePic.push({
    //         url: image.secure_url,
    //         public_id: image.public_id
    //     });
        
    // }
      let user = await User.register(new User(req.body), req.body.password);
      req.login(user, function (err) {

        if (err) return next(err);
        req.session.success = `Experience the ExPo ${user.username}`;
        // res.redirect('/users/logout');
        res.redirect('/');
        console.log(user)
      })
    } catch (err) {
      const { username, email } = req.body;
      let error = err.message;
      if (error.includes('duplicate') && error.includes("index: email_1 dup key")) {
        error = "Email already exists"
      }
      res.render('users/register', { title: "Register", username, email, error });
    }
  },
  getLogin(req, res, next) {
    res.render('users/login');
  },
  getRegister(req, res, next) {
    res.render('users/register');
  },

  // postLogin(req, res, next) {
  // 	passport.authenticate('local', {
  // 	  successRedirect: '/posts',
  // 	  failureRedirect: '/login'
  // 	})(req, res, next);
  // },

  async postLogin(req, res, next) {
    try{
    const { username, password } = req.body;
    const { user, error } = await User.authenticate()(username, password);
    if (!user && error) return next(error);
    req.login(user, function (err) {
      if (err) return next(err);
      req.session.success = `Welcome back, ${username}!`;
      const redirectUrl = req.session.redirectTo || '/posts';
      delete req.session.redirectTo;
      res.redirect(redirectUrl);
    });
  }catch(err){
    let error = err.message;
    if (error.includes('usernaeme') && error.includes("password")) {
      error = "Invalid username or password"
    }
    res.render('users/login', { title: "login", username, error });
  }
  },
  getLogout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/')
    })
  },
  async profileShow(req, res, next) {
    let user  = await User.findById(req.params.id)
    console.log(user)
    const posts = await Post.find().where('author').equals(user);
    console.log(posts)
    res.render('users/profile', { posts, user });
  }

}