(function () {
    angular
        .module ("WebAppMakerApp")
        .controller ("PageRunController", pageRunController)
        .controller ("PageListController", pageListController)
        .controller ("NewPageController", newPageController)
        .controller ("EditPageController", editPageController);

    function pageRunController (DatabaseService, $routeParams, ApplicationService, WidgetService, PageService, $sce,
                                $location, $scope) {
        var vm = this;
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;

        vm.safeYouTubeUrl = safeYouTubeUrl;
        vm.getButtonClass = getButtonClass;
        vm.trustAsHtml    = trustAsHtml;
        vm.buttonClick    = buttonClick;

        function init() {
            PageService
                .findPage(vm.applicationId, vm.pageId)
                .then(
                    function(response) {
                        // need page for page name and widgets to render the page
                        vm.page    = response.data;
                        vm.widgets = vm.page.widgets;
                        // look for DATATABLE widgets and fetch their data from database
                        for(var w in vm.widgets) {
                            // now both the DATATABLE and the REPEATER widgets need data
                            if(vm.widgets[w].widgetType=="DATATABLE" || vm.widgets[w].widgetType=="REPEATER" ) {
                                DatabaseService
                                    // had to rename 'collection' to 'collectionName' on the schema
                                    .select(vm.widgets[w].datatable.collectionName || vm.widgets[w].repeater.collectionName)
                                    .then(
                                        function (response) {
                                            vm.data = response.data;
                                        },
                                        function (err) {
                                            vm.error = err;
                                        }
                                    );
                            }
                        }
                    }
                );
        }
        init();

        // button click event handler
        function buttonClick(widget) {

            // if button has db command, then use service to execute
            if(widget.button && widget.button.dbCommand) {
                console.log(vm.fields);
                DatabaseService
                    .executeCommand(widget.button.dbCommand, vm.page, vm.fields)
                    .then(
                        function(response){
                            // if button has navigate, then go there
                            if(widget.button && widget.button.navigate) {
                                $location.url("/developer/"+vm.username+"/application/"+vm.applicationId+"/page/"+widget.button.navigate+"/run");
                            }
                        },
                        function(err){
                            vm.errors = err;
                        }
                    );
            } else {
                // if button has navigate, then go there
                if(widget.button && widget.button.navigate) {
                    $location.url("/developer/"+vm.username+"/application/"+vm.applicationId+"/page/"+widget.button.navigate+"/run");
                }
            }
        }

        function trustAsHtml(html, fields) {
            if(fields) {
                for(var key in fields) {
                    if(fields.hasOwnProperty(key)) {
                        var value = fields[key];
                        key = "{{"+key+"}}";
                        html = html.replace(key, value);
                    }
                }
                return $sce.trustAsHtml(html);
            }
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
    }

    function editPageController ($routeParams, PageService, $location) {

        var vm = this;
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;

        vm.removePage    = removePage;
        vm.updatePage    = updatePage;

        function init() {
            PageService
                .findPage(vm.applicationId, vm.pageId)
                .then(
                    function (response) {
                        vm.page = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
        init();

        function updatePage(page) {
            PageService
                .updatePage(vm.applicationId, page)
                .then(
                    function (response) {
                        $location.url("/developer/"+vm.username+"/application/"+vm.applicationId+"/page");
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }

        function removePage(page) {
            PageService
                .removePage(vm.applicationId, vm.pageId)
                .then(
                    function (response) {
                        $location.url("/developer/"+vm.username+"/application/"+vm.applicationId+"/page");
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
    }

    function pageListController ($routeParams, PageService) {

        var vm = this;
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;

        vm.sortPage      = sortPage;

        function init() {
            PageService
                .findPagesForApplication(vm.applicationId)
                .then(
                    function (response) {
                        vm.pages = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function sortPage(start, end) {
            PageService
                .sortPage(vm.applicationId, start, end)
                .then(
                    function (response) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }

    function newPageController($routeParams, PageService, $location) {

        var vm = this;
        vm.applicationId = $routeParams.applicationId;
        vm.username      = $routeParams.username;
        vm.createPage = createPage;

        function createPage(page) {
            PageService
                .createPage(vm.applicationId, page)
                .then(
                    function(response) {
                        $location.url("/developer/"+vm.username+"/application/"+vm.applicationId+"/page");
                    }
                )
        }
    }

})();