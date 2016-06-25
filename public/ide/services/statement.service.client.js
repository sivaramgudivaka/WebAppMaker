(function(){
    angular
        .module("WebAppMakerApp")
        .factory("StatementService", statementService);

    function statementService($http) {
        var api = {
            addStatement : addStatement,
            findStatement: findStatement,
            deleteStatement: deleteStatement,
            saveStatement: saveStatement,
            findAllStatements: findAllStatements
        };
        return api;

        function findAllStatements(scope){
            var url  = apiBaseUrl(scope);
            url += "/script/"+scope.scriptId+"/statement/";
            return $http.get(url);
        }

        function deleteStatement(scope) {
            var url  = apiBaseUrl(scope);
            url += "/script/"+scope.scriptId+"/statement/" + scope.statementId;
            return $http.delete(url);
        }

        function saveStatement(scope, statement) {
            var url  = apiBaseUrl(scope);
            url += "/script/"+scope.scriptId+"/statement/" + scope.statementId;
            return $http.put(url, statement);
        }

        // retrieve statement
        function findStatement(scope) {
            var url  = apiBaseUrl(scope);
                url += "/script/"+scope.scriptId+"/statement/" + scope.statementId;
            return $http.get(url);
        }

        // notify server of new statement
        function addStatement(scope, statementType) {
            var url  = "/api";
                url += "/website/"+scope.websiteId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
                url += "/script/"+scope.scriptId+"/statement/"+statementType;
            return $http.post(url);
        }
        
        function apiBaseUrl(scope) {
            var url  = "/api";
                url += "/developer/"+scope.developerId;
                url += "/website/"+scope.websiteId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
            return url;
        }
    }
})();