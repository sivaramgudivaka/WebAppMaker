module.exports = function(models) {

    var mongoose = require("mongoose");
    var StatementSchema = require("./statement.schema.server.js")();
    var Statement       = mongoose.model("Statement", StatementSchema);

    var api = {
        saveStatement: saveStatement
    };
    return api;

    function saveStatement(scope, statement) {
        statement._script = scope.scriptId;
        if(scope.statementId === 'new') {
            return Statement
                .create(statement)
                .then(
                    function(statement) {
                        return statement
                            .populate('_script');
                    }
                );
        } else {
            return Statement
                .findByIdAndUpdate(statement._id, statement)
                .populate('_script');
        }
    }
};