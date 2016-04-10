(function(){
    angular
        .module("WebAppMakerApp")
        .factory("ScriptService", scriptService);

    function scriptService($http) {
        var api = {
            createScript: createScript
        };
        return api;

        function createScript(scope, script) {
            var url  = "/api";
                url += "/application/"+scope.applicationId;
                url += "/page/"+scope.pageId;
                url += "/widget/"+scope.widgetId;
                url += "/script";
            return $http.post(url, script);
        }
    }
})();