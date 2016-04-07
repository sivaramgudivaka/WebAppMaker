var mongoose = require("mongoose");

module.exports = function () {

    var WidgetSchema = require("../widget/widget.schema.server.js");

    var PageSchema = mongoose.Schema({
        name: String,
        title: String,
        widgets: [{
            widgetType: {type: String, enum: ["HTML", "HEADER", "LABEL", "TEXT", "LINK", "BUTTON", "IMAGE", "YOUTUBE",
                "DATATABLE", "REPEATER"]},
            name: String,
            title: String,
            text: {type:String, default:'Text'},
            url: String,
            html: {
                text: String
            },
            link: {
                url: String
            },
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
            // datatable widget collection is name of page, fields are in collection
            datatable: {
                collection: String,
                fields:    [String]
            },
            repeater: {
                collection: String,
                fields:    [String],
                // same as DATATABLE with added 'template' property
                template:   String
            },
            button: {
                url: String,
                pageId: String,
                icon: String,
                style: String,
                dbCommand: String, // db command when button is clicked 
                navigate: String // holds page id where this button navigates when clicked
            },
            textInput: {
                placeholder: String,
                rows: Number,
                formatted: Boolean
            }
        }],
        dateCreated: {type: Date, default: Date.now}
    });

    return PageSchema;
};