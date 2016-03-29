var mongoose = require("mongoose");

module.exports = function () {

    var WidgetSchema = require("../widget/widget.schema.server.js");

    var PageSchema = mongoose.Schema({
        name: String,
        title: String,
        widgets: [{
            widgetType: {type: String, enum: ["HEADER", "LABEL", "TEXT", "LINK", "BUTTON", "IMAGE", "YOUTUBE"]},
            name: String,
            title: String,
            text: {type:String, default:'Text'},
            url: String,
            image: {
                url: String,
                width: String
            },
            youTube: {
                url: String,
                width: String
            },
            header: {
                size: Number
            },
            button: {
                url: String,
                pageId: String,
                icon: String
            },
            textInput: {
                placeholder: String,
                rows: Number
            }
        }],
        dateCreated: {type: Date, default: Date.now}
    });

    return PageSchema;
};