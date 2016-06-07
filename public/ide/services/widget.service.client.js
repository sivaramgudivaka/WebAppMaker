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
            sortWidget: sortWidget,
            findPagesFromWidgetId: findPagesFromWidgetId
        };
        return api;

        function findPagesFromWidgetId(widgetId) {
            return $http.get("/api/widget/"+widgetId+"/page");
        }

        function sortWidget(websiteId, pageId, startIndex, endIndex) {
            return $http.put("/api/website/"+websiteId+"/page/"+pageId+"/widget?startIndex="+startIndex+"&endIndex="+endIndex);
        }

        function removeWidget(websiteId, pageId, widgetId) {
            return $http.delete("/api/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }

        function updateWidget(websiteId, pageId, widgetId, widget) {
            return $http.put("/api/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId, widget);
        }

        function findWidgetById(websiteId, pageId, widgetId) {
            return $http.get("/api/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }

        function getWidgets(websiteId, pageId) {
            return $http.get("/api/website/"+websiteId+"/page/"+pageId+"/widget");
        }

        function addWidget(websiteId, pageId, widgetType) {
            return $http.post("/api/website/"+websiteId+"/page/"+pageId+"/widget?widgetType="+widgetType);
        }
    }
})();