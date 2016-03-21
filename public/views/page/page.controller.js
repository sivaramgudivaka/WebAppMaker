(function () {
    angular
        .module ("WebAppMakerApp")
        .controller ("PageListController", pageListController)
        .controller ("NewPageController", newPageController)
        .controller ("EditPageController", editPageController);

    // 4.0
    function editPageController ($routeParams) {

        var vm = this;
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;

    }

    function pageListController ($routeParams, PageService) {

        var vm = this;
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;

        function init() {
            PageService
                .findPagesForApplication(vm.applicationId)
                // 1.0
                .then(
                    function (response) {
                        vm.pages = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
        init();
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