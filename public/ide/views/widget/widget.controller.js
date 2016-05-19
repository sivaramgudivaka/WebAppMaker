(function () {
    angular
        .module ("WebAppMakerApp")
        .controller ("WidgetListController", widgetListController)
        .controller ("WidgetEditController", widgetEditController)
        .controller ("ChooseWidgetController", chooseWidgetController);

    function widgetEditController($routeParams, WidgetService, $location, PageService) {

        var vm = this;
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        vm.updateWidget  = updateWidget;
        vm.removeWidget  = removeWidget;

        function init() {
            // populate the page dropdown to select button navigate property
            PageService
                .findPagesForApplication(vm.applicationId)
                .then(
                    function(response) {
                        vm.pages = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

            WidgetService
                .findWidgetById(vm.applicationId, vm.pageId, vm.widgetId)
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
                .removeWidget(vm.applicationId, vm.pageId, vm.widgetId)
                .then(
                    function(response) {
                        $location.url("/developer/"+vm.username+"/website/"+vm.applicationId+"/page/"+vm.pageId+"/widget");
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }

        function updateWidget(widget) {
            WidgetService
                .updateWidget(vm.applicationId, vm.pageId, vm.widgetId, widget)
                .then(
                    function(response) {
                        $location.url("/developer/"+vm.username+"/website/"+vm.applicationId+"/page/"+vm.pageId+"/widget");
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }
    }

    function widgetListController ($routeParams, WidgetService, $sce) {

        var vm = this;
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;

        vm.safeYouTubeUrl = safeYouTubeUrl;
        vm.getButtonClass = getButtonClass;
        vm.sortWidget     = sortWidget;
        vm.trustAsHtml    = trustAsHtml;

        function init() {
            WidgetService
                .getWidgets(vm.applicationId, vm.pageId)
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
                .sortWidget(vm.applicationId, vm.pageId, start, end)
                .then(
                    function (response) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }

    function chooseWidgetController ($routeParams, WidgetService, $location) {

        var vm = this;

        vm.username = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;

        vm.selectWidget = selectWidget;

        function selectWidget(widgetType) {
            WidgetService
                .addWidget(vm.applicationId, vm.pageId, widgetType)
                .then(
                    function(response) {
                        var newWidget = response.data
                        $location.url("/developer/"+vm.username+"/website/"+vm.applicationId+"/page/"+vm.pageId+"/widget/" + newWidget._id + "/edit");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }

})();