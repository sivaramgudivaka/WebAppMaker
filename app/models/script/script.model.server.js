module.exports = function(applicationModel) {

    var api = {
        saveScript : saveScript
    };
    return api;

    function saveScript(scope, script) {
        return applicationModel
            .findApplicationById(scope.applicationId)
            .then(
                function(application) {
                    var widget = application
                        .pages.id(scope.pageId)
                        .widgets.id(scope.widgetId);

                    if(!widget.button) {
                        widget.button = {};
                    }

                    widget.button.script = script;
                    application.save();
                }
            );
    }
}