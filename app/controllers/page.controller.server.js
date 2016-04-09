
// server side controllers handle page routes 
module.exports = function(app) {
    
    // simple page route
    app.get('/page', pageController);

    // controller handles request
    // renders template view
    function pageController(req, res) {
        res.render('page');
    }
}
