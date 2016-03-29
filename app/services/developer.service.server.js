var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, developerModel) {
    app.post ("/api/developer", createDeveloper);
    app.get ("/api/developer", findAllDevelopers);
    app.get ("/api/developer/:username", findDeveloperByUsername);
    app.put ("/api/developer/:username", updateDeveloper);
    app.delete ("/api/developer/:username", deleteDeveloper);

    var auth = authorized;
    app.post  ('/api/login', passport.authenticate('local'), login);

    passport.use(new LocalStrategy(localStrategy));

    function localStrategy(username, password, done) {
        developerModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
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
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function deleteDeveloper (req, res) {
        var username = req.params.username;
        developerModel
            .deleteDeveloper (username)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateDeveloper (req, res) {
        var username = req.params.username;
        var developer = req.body;
        developerModel
            .updateDeveloper (username, developer)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findDeveloperByUsername (req, res) {
        developerModel
            .findDeveloperByUsername (req.params.username)
            .then (
                function (developer) {
                    res.json (developer);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllDevelopers (req, res) {
        developerModel
            .findAllDevelopers ()
            .then (
                function (developers) {
                    res.json (developers);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createDeveloper (req, res) {
        var developer = req.body;
        developerModel
            .createDeveloper (developer)
            .then (
                function (developer) {
                    res.json (developer);
                },
                function (err) {
                    res.status (400).send ( err);
                }
            );
    }
};