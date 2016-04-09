module.exports = function (app, db) {

    var model = require("./models/model.js")();

    var developerService   = require("./services/developer.service.server.js")  (app, model);
    var applicationService = require("./services/application.service.server.js")(app, model);
    var pageService        = require("./services/page.service.server.js")       (app, model);
    var widgetService      = require("./services/widget.service.server.js")     (app, model);
    var shareService       = require("./services/share.service.server")         (app, model);

    // pass express app and db connection to database service
    var databaseService = require("./services/database.service.server")(app, db);

    // load a server side controller to handle page routes,
    // provide data, and render templates 
    var controllers = require("./controllers/page.controller.server.js")(app);
};