(function(){
    angular
        .module("WebAppMakerApp")
        .factory("ScriptService", scriptService);

    function scriptService($http) {
        var api = {
            createScript : saveScript,
            saveScript   : saveScript,
            findScript   : findScript,
            addStatement : addStatement
        };
        return api;

        // notify server of new statement
        function addStatement(scope, statementType) {
            var url  = "/api";
                url += "/application/"+scope.applicationId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
                url += "/script/statement/"+statementType;
            return $http.post(url);
        }
        
        function findScript(scope) {
            var url  = "/api";
                url += "/application/"+scope.applicationId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
                url += "/script";
            return $http.get(url);
        }

        function saveScript(scope, script) {
            var url  = "/api";
                url += "/application/"+scope.applicationId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
                url += "/script";
            return $http.post(url, script);
        }
    }
})();