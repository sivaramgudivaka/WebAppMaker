(function(){
    angular
        .module("WebAppMakerApp")
        .factory("ScriptService", scriptService);

    function scriptService($http) {
        var api = {
            createScript : saveScript,
            saveScript   : saveScript,
            findScript   : findScript,
            addStatement : addStatement,
            findStatement: findStatement,
            deleteStatement: deleteStatement,
            updateStatement: updateStatement
        };
        return api;

        function deleteStatement(scope) {
            var url  = apiBaseUrl(scope);
            url += "/script/statement/" + scope.statementId;
            return $http.delete(url);
        }

        function updateStatement(scope, statement) {
            var url  = apiBaseUrl(scope);
            url += "/script/statement/" + scope.statementId;
            return $http.put(url, statement);
        }

        // retrieve statement
        function findStatement(scope) {
            var url  = apiBaseUrl(scope);
                url += "/script/statement/" + scope.statementId;
            return $http.get(url);
        }

        // notify server of new statement
        function addStatement(scope, statementType) {
            var url  = "/api";
                url += "/website/"+scope.websiteId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
                url += "/script/statement/"+statementType;
            return $http.post(url);
        }
        
        function findScript(scope) {
            var url  = "/api";
                url += "/website/"+scope.websiteId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
                url += "/script";
            return $http.get(url);
        }

        function saveScript(scope, script) {
            var url  = "/api";
                url += "/website/"+scope.websiteId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
                url += "/script";
            return $http.post(url, script);
        }

        function apiBaseUrl(scope) {
            var url  = "/api";
                url += "/website/"+scope.websiteId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
            return url;
        }
    }
})();