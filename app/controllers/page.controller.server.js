
// server side controllers handle page routes 
module.exports = function(app, model) {

    // get page model from model singleton
    var pageModel = model.pageModel;
    
    // receive data as path parameters
    app.get('/developer/:username/application/:applicationId/page/:pageId', pageController);

    // controller handles request
    // renders template view
    function pageController(req, res) {

        // extract path parameters from URL
        // including username too
        var username      = req.params.username;
        var applicationId = req.params.applicationId;
        var pageId        = req.params.pageId;

        // use model to retrieve page object
        pageModel.findPage(applicationId, pageId)
            .then(
                function(page) {

                    // create data map
                    var context = {
                        username      : username,
                        applicationId : applicationId,
                        pageId        : pageId,
                        page          : page // add page to data map for template
                    };

                    // pass data map to template for rendering
                    res.render('page', context);
                }
            )
    }
}
