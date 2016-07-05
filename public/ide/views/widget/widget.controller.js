(function () {
    angular
        .module ("WebAppMakerApp")
        .factory('Pagination', Pagination)
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

    function widgetListController ($routeParams, PageService, WidgetService, $sce, Pagination) {

        var vm = this;
        vm.username       = $routeParams.username;
        vm.developerId   = $routeParams.developerId;
        vm.websiteId      = $routeParams.websiteId;
        vm.pageId         = $routeParams.pageId;

        vm.safeYouTubeUrl = safeYouTubeUrl;
        vm.getButtonClass = getButtonClass;
        vm.sortWidget     = sortWidget;
        vm.trustAsHtml    = trustAsHtml;


        vm.sushi = [
            { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
            { name: 'Philly', fish: 'Tuna', tastiness: 4 },
            { name: 'Tiger', fish: 'Eel', tastiness: 7 },
            { name: 'Rainbow', fish: 'Variety', tastiness: 6 },
            { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
            { name: 'Philly', fish: 'Tuna', tastiness: 4 },
            { name: 'Tiger', fish: 'Eel', tastiness: 7 },
            { name: 'Rainbow', fish: 'Variety', tastiness: 6 },
            { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
            { name: 'Philly', fish: 'Tuna', tastiness: 4 },
            { name: 'Tiger', fish: 'Eel', tastiness: 7 },
            { name: 'Rainbow', fish: 'Variety', tastiness: 6 },
            { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
            { name: 'Philly', fish: 'Tuna', tastiness: 4 },
            { name: 'Tiger', fish: 'Eel', tastiness: 7 },
            { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
        ];
        
        vm.datatableMethods = {}; // contains sort, filter info of all datatables
        
        vm.pager = {};
        vm.setPage = setPage;
        vm.initializeDataTableMethods = initializeDataTableMethods;


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
                        for(var i = 0; i< vm.widgets.length; i++)
                        {
                            if(vm.widgets[i].widgetType == 'DATATABLE')
                            {
                                initializeDataTableMethods(vm.widgets[i]._id);
                                vm.setPage(1, vm.widgets[i].datatable.pageRows);
                            }
                        }
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function initializeDataTableMethods(id) {
            vm.datatableMethods[id] = {'orderByField': '', 'reverseSort': false, 'search': {}};
        }

        function setPage(page, rows) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }

            // get pager object from service
            vm.pager = Pagination.GetPager(vm.sushi.length, page, rows);

            // get current page of items
            vm.items = vm.sushi.slice(vm.pager.startIndex, vm.pager.endIndex);
        }

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

    function Pagination() {
        // service definition
        var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize, rows) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is rows
            pageSize = pageSize || rows;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = startIndex + pageSize;

            // create an array of pages to ng-repeat in the pager control
            var pages = [];
            for (var i=startPage; i<endPage + 1; i++) {
                pages.push(i);
            }

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
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