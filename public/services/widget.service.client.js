(function(){
    angular
        .module("WebAppMakerApp")
        .factory("WidgetService", widgetService);

    function widgetService($http) {
        var api = {
            addWidget: addWidget,
            getWidgets: getWidgets,
            findWidgetById: findWidgetById
        };
        return api;

        function findWidgetById(applicationId, pageId, widgetId) {
            return $http.get("/api/application/"+applicationId+"/page/"+pageId+"/widget/"+widgetId);
        }

        function getWidgets(applicationId, pageId) {
            return $http.get("/api/application/"+applicationId+"/page/"+pageId+"/widget");
        }

        function addWidget(applicationId, pageId, widgetType) {
            return $http.post("/api/application/"+applicationId+"/page/"+pageId+"/widget?widgetType="+widgetType);
        }
    }
})();