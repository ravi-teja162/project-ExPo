const User = require('../models/user');
const Post = require('../models/post');


module.exports = {
	async landingPage(req, res, next) {
		const posts = await Post.find({});
		res.render('index', { posts, title: 'Project ExPo' });
	},
	about(req, res, next) {

		res.render('aboutus', {  title: 'Project ExPo' });
	}
}