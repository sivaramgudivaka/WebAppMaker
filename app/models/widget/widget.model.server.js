module.exports = function(applicationModel) {

    var Application = applicationModel.getMongooseModel();

    var api = {
        createWidget: createWidget,
        updateWidget: updateWidget,
        removeWidget: removeWidget,
        sortWidget  : sortWidget
    };
    return api;

    function sortWidget(applicationId, pageId, startIndex, endIndex) {
        return Application
            .findById(applicationId)
            .then(
                function(application) {
                    application.pages.id(pageId).widgets.splice(endIndex, 0, application.pages.id(pageId).widgets.splice(startIndex, 1)[0]);

                    // notify mongoose 'pages' field changed
                    application.markModified("pages");

                    application.save();
                }
            );
    }

    function removeWidget(applicationId, pageId, widgetId, newWidget) {
        return Application
            .findById(applicationId)
            .then(
                function(application) {
                    application.pages.id(pageId).widgets.remove(widgetId);
                    return application.save();
                }
            );
    }

    function updateWidget(applicationId, pageId, widgetId, newWidget) {
        delete newWidget._id;
        return Application
            .findById(applicationId)
            .then(
                function(application) {
                    var widget = application.pages.id(pageId).widgets.id(widgetId);
                    widget.name = newWidget.name;
                    widget.text = newWidget.text;
                    if(widget.widgetType === "HEADER") {
                        if(newWidget.header) {
                            widget.header.size = newWidget.header.size || 2;
                        }
                    } else if(widget.widgetType === "HTML") {
                        if(newWidget.html) {
                            widget.html.text = newWidget.html.text;
                        }
                    } else if(widget.widgetType === "IMAGE") {
                        if(newWidget.image) {
                            widget.image.url = newWidget.image.url;
                            widget.image.width = newWidget.image.width;
                        }
                    } else if(widget.widgetType === "YOUTUBE") {
                        if(newWidget.youTube) {
                            widget.youTube.url = newWidget.youTube.url;
                            widget.youTube.width = newWidget.youTube.width;
                        }
                    } else if(widget.widgetType === "TEXT") {
                        if(newWidget.textInput) {
                            widget.textInput.placeholder = newWidget.textInput.placeholder;
                            widget.textInput.rows = newWidget.textInput.rows;
                        }
                    } else if(widget.widgetType === "LINK") {
                        if(newWidget.link) {
                            widget.link.url = newWidget.link.url;
                            widget.link.target = newWidget.link.target;
                        }
                    } else if(widget.widgetType === "BUTTON") {
                        if(newWidget.button) {
                            widget.button.style = newWidget.button.style;
                            // save page id button navigates to
                            widget.button.navigate = newWidget.button.navigate._id;
                        }
                    }
                    return application.save();
                }
            );
    }

    function createWidget(applicationId, pageId, widgetType) {
        return Application.findById(applicationId)
            .then(
                function(application) {

                    var widget = {
                        widgetType: widgetType
                    };

                    application.pages.id(pageId).widgets.push(widget);

                    return application.save();
                }
            );
    }
}