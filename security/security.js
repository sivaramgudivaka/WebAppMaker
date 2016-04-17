var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, userModel, developerModel) {

    passport.use('ide',   new LocalStrategy(ideLocalStrategy));
    passport.use('store', new LocalStrategy(storeLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/ide/login',    passport.authenticate('ide'), ideLogin);
    app.post  ('/api/ide/logout',   ideLogout);
    app.get   ('/api/ide/loggedin', ideLoggedin);
    app.post  ('/api/ide/register', ideRegister);

    app.post  ('/api/store/login',    passport.authenticate('store'), storeLogin);
    app.post  ('/api/store/logout',   logout);
    app.get   ('/api/store/loggedin', loggedin);
    app.post  ('/api/store/register', register);

    function ideLocalStrategy(username, password, done) {
        developerModel
            .findDeveloperByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function storeLocalStrategy(username, password, done) {
        userModel
            .findByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.type == 'developer') {
            developerModel
                .findDeveloperById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if(user.type == 'store') {
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }
};