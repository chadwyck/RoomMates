var User, crypto, request;
crypto = require('crypto');
User = require('../models/User');

exports.reg = function (req, res) {
	res.render('reg.jade', {title: 'Register'});
};

exports.doReg = function (req, res) {
	if (req.body['password'].length < 6) {
		req.flash('error.jade', 'Password is too short');
		return res.redirect('/reg');
	}
	if (req.body['password-repeat'] != req.body['password']) {
		req.flash('error', 'Passwords do not match');
		return res.redirect('/reg');
	}

	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	var author = req.body.author;
	var newUser = new User({ name: req.body.username, password: password, author: author});
	User.get(newUser.name, function (err, user) {
		if (user)
			err = 'The username has been taken';
		if (err) {
			req.flash('error', err);
			return res.redirect('/reg');
		}
		newUser.save(function (err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.flash('success', 'Login success');
			res.redirect('/');
		});
	});
};
