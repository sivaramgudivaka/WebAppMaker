module.exports = function() {

    var mongoose = require("mongoose");
    var mongojs  = require('mongojs');

    mongoose.connect('mongodb://localhost/web-app-maker');
    mongojs('web-app-maker');

    var applicationModel = require("./application/application.model.server")();
    var shareModel       = require("./application/share.model.server")(applicationModel);
    var pageModel        = require("./page/page.model.server")(applicationModel);
    var widgetModel      = require("./widget/widget.model.server")(applicationModel);
    var developerModel   = require("./developer/developer.model.server")();

    var model = {
        applicationModel : applicationModel,
        shareModel       : shareModel,
        pageModel        : pageModel,
        widgetMode       : widgetModel,
        developerModel   : developerModel
    };
    return model;
}