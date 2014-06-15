var auth, doLogin, doReg, index, login,
	logout, reg, regi, user, startProcess,
	chooseProcess, getTasks, chooseTask,
	runUI, UIresp, completeT, errorMessage,
	upload, doUpload, upld, buildUI, postHTML,
	dataBindPage, ajaxBind;


auth = require('./auth');
regi = require('./reg');


exports.route = function (app) {
	app.get('/', index);
	app.get('/reg', reg);
	app.post('/reg', doReg);
	app.get('/login', login);
	app.post('/login', doLogin);
	app.get('/logout', logout);


};

index = function (req, res) {
	return res.render('../views/index.jade', {title: "Home"});
};

reg = function (req, res) {
	return regi.reg(req, res);
};

doReg = function (req, res) {
	return regi.doReg(req, res);
};

login = function (req, res) {
	return auth.login(req, res);
};

doLogin = function (req, res) {
	return auth.doLogin(req, res);
};

logout = function (req, res) {
	return auth.logout(req, res);
};