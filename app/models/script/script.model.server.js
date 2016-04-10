var q = require("q");
var mongoose = require("mongoose");

module.exports = function(applicationModel) {

    var StatementSchema = require("./statement.schema.server.js")();
    var StatementModel  = mongoose.model("StatementModel", StatementSchema);

    var ScriptSchema = require("./script.schema.server.js")();
    var ScriptModel  = mongoose.model("ScriptModel", ScriptSchema);

    var api = {
        saveScript : saveScript,
        findScript : findScript,
        addStatement : addStatement,
        findStatement: findStatement
    };
    return api;

    // retrieve statement from database
    function findStatement(scope) {

        var deferred = q.defer();

        findScript(scope)
            .then(
                function(script) {
                    var statement = script.statements.id(scope.statementId);
                    deferred.resolve(statement);
                },
                function (err) {
                    deferred.reject(err);
                }
            );

        return deferred.promise;
    }

    function addStatement(scope) {
        
        // use q because we want to control exactly we want to resolve
        // we want to resolve the script, not the application
        var deferred = q.defer();

        applicationModel
            .findApplicationById(scope.applicationId)
            .then(
                function(application) {
                    var widget = application
                        .pages.id(scope.pageId)
                        .widgets.id(scope.widgetId);

                    if(!widget.button || !widget.button.script) {
                        widget.button = {
                            script: new ScriptModel()
                        };
                    }

                    var statement = new StatementModel({
                        statementType: scope.statementType
                    });

                    widget.button.script.statements.push(statement);

                    return application.save();
                },
                function(err) {
                    deferred.reject(err);
                }
            )
            .then(
                function(application) {
                    var widget = application
                        .pages.id(scope.pageId)
                        .widgets.id(scope.widgetId);
                    deferred.resolve(widget);
                },
                function (err) {
                    deferred.reject(err);
                }
            );

        return deferred.promise;
    }

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

    function findScript(scope) {

        var deferred = q.defer();

        applicationModel
            .findApplicationById(scope.applicationId)
            .then(
                function(application) {
                    var widget = application
                        .pages.id(scope.pageId)
                        .widgets.id(scope.widgetId);

                    if (widget.button && widget.button.script) {
                        deferred.resolve(widget.button.script);
                    } else {
                        deferred.resolve({});
                    }
                },
                function(err) {
                    deferred.reject(err);
                }
            );

        return deferred.promise;
    }
}