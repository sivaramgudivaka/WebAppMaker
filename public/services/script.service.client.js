(function(){
    angular
        .module("WebAppMakerApp")
        .factory("ScriptService", scriptService);

    function scriptService($http) {
        var api = {
            createScript: saveScript,
            saveScript: saveScript
        };
        return api;

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