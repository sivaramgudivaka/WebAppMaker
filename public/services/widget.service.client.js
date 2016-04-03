(function(){
    angular
        .module("WebAppMakerApp")
        .factory("WidgetService", widgetService);

    function widgetService($http) {
        var api = {
            addWidget: addWidget,
            getWidgets: getWidgets,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            removeWidget: removeWidget,
            sortWidget: sortWidget
        };
        return api;

        function sortWidget(applicationId, pageId, startIndex, endIndex) {
            return $http.put("/api/application/"+applicationId+"/page/"+pageId+"/widget?startIndex="+startIndex+"&endIndex="+endIndex);
        }

        function removeWidget(applicationId, pageId, widgetId) {
            return $http.delete("/api/application/"+applicationId+"/page/"+pageId+"/widget/"+widgetId);
        }

        function updateWidget(applicationId, pageId, widgetId, widget) {
            return $http.put("/api/application/"+applicationId+"/page/"+pageId+"/widget/"+widgetId, widget);
        }

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