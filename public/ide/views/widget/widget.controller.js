(function () {
    angular
        .module ("WebAppMakerApp")
        .controller ("WidgetListController", widgetListController)
        .controller ("WidgetEditController", widgetEditController)
        .controller ("ChooseWidgetController", chooseWidgetController);

    function widgetEditController($routeParams, WidgetService, $location, PageService) {

        var vm = this;
        vm.username      = $routeParams.username;
        vm.developerId   = $routeParams.developerId;
        vm.websiteId     = $routeParams.websiteId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        vm.updateWidget  = updateWidget;
        vm.removeWidget  = removeWidget;

        function init() {
            PageService
                .findPagesForWebsite(vm.websiteId)
                .then(
                    function(response) {
                        vm.pages = response.data;
                        return WidgetService
                            .findWidgetById(vm.websiteId, vm.pageId, vm.widgetId);
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
                .then(
                    function(response){
                        vm.widget = response.data;
                    },
                    function(error){
                        vm.error = err;
                    }
                );
        }
        init();

        function removeWidget(widget) {
            WidgetService
                .removeWidget(vm.websiteId, vm.pageId, vm.widgetId)
                .then(
                    function(response) {
                        $location.url("/developer/"+vm.developerId+"/website/"+vm.websiteId+"/page/"+vm.widget._page+"/widget");
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }

        function updateWidget(widget) {
            WidgetService
                .updateWidget(vm.websiteId, vm.pageId, vm.widgetId, widget)
                .then(
                    function(response) {
                        $location.url("/developer/"+vm.developerId+"/website/"+vm.websiteId+"/page/"+widget._page+"/widget");
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }
    }

    function widgetListController ($routeParams, PageService, WidgetService, $sce) {

        var vm = this;
        vm.username       = $routeParams.username;
        vm.developerId   = $routeParams.developerId;
        vm.websiteId      = $routeParams.websiteId;
        vm.pageId         = $routeParams.pageId;

        vm.safeYouTubeUrl = safeYouTubeUrl;
        vm.getButtonClass = getButtonClass;
        vm.sortWidget     = sortWidget;
        vm.trustAsHtml    = trustAsHtml;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(
                    function(response) {
                        vm.page = response.data;
                        return WidgetService.getWidgets(vm.websiteId, vm.pageId);
                    },
                    function(error) {
                        vm.error = error;
                    }
                )
                .then(
                    function(response) {
                        vm.widgets = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function trustAsHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getButtonClass(style) {
            if(!style) {
                style = "default";
            }
            return "btn-"+style.toLowerCase();
        }

        function safeYouTubeUrl(widget) {
            if(widget && widget.youTube) {
                var urlParts = widget.youTube.url.split("/");
                var youTubeId = urlParts[urlParts.length-1];
                return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+youTubeId);
            }
            return "";
        }

        function sortWidget(start, end) {
            WidgetService
                .sortWidget(vm.websiteId, vm.pageId, start, end)
                .then(
                    function (response) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }

    function chooseWidgetController ($routeParams, WidgetService, PageService, $location) {

        var vm = this;

        vm.username  = $routeParams.username;
        vm.developerId   = $routeParams.developerId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId    = $routeParams.pageId;

        vm.selectWidget = selectWidget;

        function selectWidget(widgetType) {
            PageService
                .findPageById(vm.pageId)
                .then(
                    function(response) {
                        vm.page = response.data;
                        return WidgetService
                            .addWidget(vm.page._website, vm.page._id, widgetType)
                    },
                    function(error) {
                        vm.error = error;
                    }
                )
                .then(
                    function(response) {
                        var newWidget = response.data
                        $location.url("/developer/"+vm.developerId+"/website/"+vm.websiteId+"/page/"+vm.page._id+"/widget/" + newWidget._id);
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }

})();