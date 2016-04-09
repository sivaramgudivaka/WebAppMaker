
// server side controllers handle page routes 
module.exports = function(app) {
    
    // receive data as path parameters
    app.get('/application/:applicationId/page/:pageId', pageController);

    // controller handles request
    // renders template view
    function pageController(req, res) {

        // extract path parameters from URL
        var applicationId = req.params.applicationId;
        var pageId        = req.params.pageId;

        // create data map
        var context = {
            applicationId : applicationId,
            pageId        : pageId
        };

        // pass data map to template for rendering
        res.render('page', context);
    }
}
