module.exports = function (app, db) {
    var developerModel = require ("./models/developer/developer.model.server.js")(db);
    var developerService = require("./services/developer.service.server.js")(app, developerModel);

    var applicationModel = require("./models/application/application.model.server.js")();
    var applicationService = require("./services/application.service.server.js")(app, applicationModel);

    var pageService = require("./services/page.service.server.js")(app, applicationModel);

    var widgetService = require("./services/widget.service.server.js")(app, applicationModel);

    var shareModel    = require("./models/application/share.model.server")();
    var shareService  = require("./services/share.service.server")(app, shareModel, applicationModel);

    // pass express app and db connection to database service
    var databaseService = require("./services/database.service.server")(app, db);
};