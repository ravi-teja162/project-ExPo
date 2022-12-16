const Post = require('../models/post.js');
const User = require('../models/user.js');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "dyeerwjyd",
    api_key: "172221199623714",
    api_secret: process.env.CLOUDINARY_SECRET
});


module.exports = {
    async postIndex(req, res, next) {

        let posts = await Post.find().populate('author', 'username');
        let users = await User.find();
        let type = ''
        res.render('posts/index', { posts, users,type });
    },

    postNewProject(req, res, next) {
        res.render('posts/newProject');
    }, postNewIdea(req, res, next) {
        res.render('posts/newIdea');
    }, postNewPaper(req, res, next) {
        res.render('posts/newPaper');
    }, postNewEvent(req, res, next) {
        res.render('posts/newEvent');
    },

    async postCreate(req, res, next) {
    
        req.body.post.images = [];

        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }

        let user = await User.findById(req.user.id);
        req.body.post.author = user;
        req.body.post.tumbnail = req.body.post.images[0];
        let post = await Post.create(req.body.post);
        req.session.success = "Post Created sucesfully"
        res.redirect(`/posts/${post.id}`);

    },

    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id).populate('author', 'username email role dept')
        res.render("posts/show", { post });

    },
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render("posts/edit", { post })
    },
    async postUpdate(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        res.redirect(`/posts/${post.id}`);

    },
    async postDelete(req, res, next) {
        let post = await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    },

    async postIdea(req, res, next) {
        const posts = await Post.find({ "typeOf": "idea" }).populate('author', 'username')
        let type = "idea"
        let users = await User.find();
        // let posts = await Post.find().populate('author', 'username');
        res.render('posts/index', { posts, users, type });
    },
    
        async postPaper(req, res, next) {
        const posts = await Post.find({ "typeOf": "paper" }).populate('author', 'username')
        const type = "paper";
        let users = await User.find();
        // let posts = await Post.find().populate('author', 'username');
        res.render('posts/index', { posts, users, type });
    }, async postEvent(req, res, next) {
        const posts = await Post.find({ "typeOf": "event" }).populate('author', 'username')
        let users = await User.find();
        const type = "event";
        // let posts = await Post.find().populate('author', 'username');
        res.render('posts/index', { posts, users, type });

    }, async postProject(req, res, next) {
        const posts = await Post.find({ "typeOf": "project" }).populate('author', 'username')
        let users = await User.find();
        const type = "project";

        // let posts = await Post.find().populate('author', 'username');
        res.render('posts/index', { posts, users, type });
    },


}