var User, crypto;
crypto = require('crypto');
User = require('../models/User');

//render the login page
exports.login = function(req, res){
	res.render('login.jade', {title: 'User Login'});
};


exports.doLogin = function(req, res) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64'); // encrypt the password
	User.get(req.body.username, function (err, user) {
		if (!user) {
			req.flash('error', 'User does not exist');
			return res.redirect('/login');

		}
		if (user.password != password) {
			req.flash('error', 'Wrong Password');
			return res.redirect('/login');
		}
		req.session.user = user; //store the user session.
		req.flash('success', 'Login Success');
		res.redirect('/');
	});
};

exports.logout = function(req, res){
	req.session.user = null;//delete the user session
	req.flash('success', 'Logout Success');
	res.redirect('/');
};