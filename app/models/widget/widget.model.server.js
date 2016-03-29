module.exports = function(applicationModel) {

    var Application = applicationModel.getMongooseModel();

    var api = {
        createWidget: createWidget,
        updateWidget: updateWidget
    };
    return api;

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
                        widget.header.size = newWidget.header.size;
                    } else if(widget.widgetType === "IMAGE") {
                        widget.image.url = newWidget.image.url;
                        widget.image.width = newWidget.image.width;
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